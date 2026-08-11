import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// GitHub 风格提交热力图，政务蓝配色，纯 SVG 渲染
const CELL = 11;
const GAP = 3;

// 提交等级 → 颜色（浅→深，政务蓝系）
const LEVEL_COLORS = [
  "#ebedf0", // 0 无提交
  "#c6d7ec", // 1 低
  "#8fb4de", // 2 中低
  "#4f86c2", // 3 中高
  "#0d4a8a", // 4 高（主色）
];

const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

export default function GitHubHeatmap({ username = "smartartian" }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/contributions.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => setData(d))
      .catch(() => setError(true));
  }, []);

  if (error) return <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>热力图数据加载失败</p>;
  if (!data) return <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>加载热力图数据中...</p>;

  const { contributions, total } = data;
  const totalCommits = total?.lastYear ?? 0;

  // 按天索引，日期 → { level, count }
  const byDate = new Map(contributions.map((c) => [c.date, c]));

  // 构建 53 周网格：每周从周日开始（GitHub 惯例）
  const first = new Date(contributions[0].date);
  const last = new Date(contributions[contributions.length - 1].date);
  const start = new Date(first);
  start.setDate(start.getDate() - start.getDay()); // 对齐到周日

  const weeks = [];
  for (let d = new Date(start); d <= last; d.setDate(d.getDate() + 7)) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(d);
      day.setDate(d.getDate() + i);
      const iso = day.toISOString().slice(0, 10);
      week.push({
        iso,
        level: byDate.get(iso)?.level ?? 0,
        count: byDate.get(iso)?.count ?? 0,
        inRange: iso >= contributions[0].date && iso <= last.toISOString().slice(0, 10),
      });
    }
    weeks.push(week);
  }

  const height = 7 * (CELL + GAP) - GAP;
  const width = weeks.length * (CELL + GAP) - GAP;

  // 月份标签：取每周周日所在月，与上一标签不同月才显示
  const monthLabels = weeks.map((week, wi) => {
    const sunday = week[0];
    if (!sunday.inRange) return null;
    const m = new Date(sunday.iso + "T00:00:00").getMonth();
    const prev = wi > 0 ? new Date(weeks[wi - 1][0].iso + "T00:00:00").getMonth() : null;
    return prev !== m ? { wi, label: MONTHS[m] } : null;
  }).filter(Boolean);

  return (
    <div className="heatmap">
      <div className="heatmap-top">
        <span className="heatmap-title">
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" style={{ verticalAlign: "-2px", marginRight: 6 }}>
            <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
          GitHub
        </span>
        <a
          className="heatmap-link"
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
        >
          @{username}
        </a>
      </div>

      <div className="heatmap-body">
        <div className="heatmap-months">
          {monthLabels.map(({ wi, label }) => (
            <span key={wi} style={{ left: wi * (CELL + GAP) }}>
              {label}
            </span>
          ))}
        </div>
        <div className="heatmap-scroll">
          <svg width={width} height={height} role="img" aria-label="最近一年的 GitHub 提交热力图">
            <desc>共 {totalCommits} 次提交，颜色越深提交越多</desc>
            {weeks.map((week, wi) =>
              week.map((day, di) =>
                day.inRange && day.count > 0 ? (
                  <rect
                    key={day.iso}
                    x={wi * (CELL + GAP)}
                    y={di * (CELL + GAP)}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    fill={LEVEL_COLORS[day.level]}
                  >
                    <title>{`${day.iso}：${day.count} 次提交`}</title>
                  </rect>
                ) : (
                  <rect
                    key={day.iso}
                    x={wi * (CELL + GAP)}
                    y={di * (CELL + GAP)}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    fill={day.inRange ? LEVEL_COLORS[day.level] : "transparent"}
                  />
                ),
              ),
            )}
          </svg>
        </div>
        <div className="heatmap-legend">
          <span className="heatmap-legend-text">少</span>
          {LEVEL_COLORS.map((c) => (
            <span key={c} className="heatmap-cell" style={{ background: c }} />
          ))}
          <span className="heatmap-legend-text">多</span>
        </div>
      </div>

      <div className="heatmap-footer">
        最近一年共 <strong>{totalCommits}</strong> 次提交
      </div>
    </div>
  );
}
