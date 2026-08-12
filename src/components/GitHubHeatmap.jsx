import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// GitHub 风格提交热力图，政务蓝配色，纯 SVG 渲染，支持年份切换
const CELL = 11;
const GAP = 3;

// 提交等级 → 颜色（浅→深，政务蓝系；CSS 变量实现，暗色模式自动切换）
const LEVEL_COLORS = [
  "var(--heat-0)",
  "var(--heat-1)",
  "var(--heat-2)",
  "var(--heat-3)",
  "var(--heat-4)",
];

const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
const MONTH_H = 16; // 月份标签行高（SVG 内部）

function toIso(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function GitHubHeatmap({ username = "smartartian" }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [year, setYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    fetch("/contributions.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => setData(d))
      .catch(() => setError(true));
  }, []);

  const currentYear = new Date().getFullYear();

  const { yearList, grid, totalCommits, isCurrentYear } = useMemo(() => {
    if (!data?.years) return { yearList: [], grid: null, totalCommits: 0, isCurrentYear: false };
    const years = Object.keys(data.years).sort((a, b) => Number(b) - Number(a));
    const yearData = data.years[String(year)];
    if (!yearData) return { yearList: years, grid: null, totalCommits: 0, isCurrentYear: year === currentYear };

    // 数据窗口：当年 = 今天往前推一年（滚动窗口）；历史年 = 完整 1-12 月
    let windowStart, windowEnd;
    if (year === currentYear) {
      windowEnd = new Date();
      windowStart = new Date(windowEnd);
      windowStart.setDate(windowStart.getDate() - 364);
    } else {
      windowStart = new Date(year, 0, 1);
      windowEnd = new Date(year, 11, 31);
    }
    const startIso = toIso(windowStart);
    const endIso = toIso(windowEnd);

    // 按天索引
    const byDate = new Map(yearData.contributions.map((c) => [c.date, c]));

    // 构建周网格（每周从周日开始，GitHub 惯例）
    const gridStart = new Date(windowStart);
    gridStart.setDate(gridStart.getDate() - gridStart.getDay());
    const weeks = [];
    for (let d = new Date(gridStart); d <= windowEnd; d.setDate(d.getDate() + 7)) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(d);
        day.setDate(d.getDate() + i);
        const iso = toIso(day);
        const inRange = iso >= startIso && iso <= endIso;
        week.push({
          iso,
          level: inRange ? byDate.get(iso)?.level ?? 0 : 0,
          count: inRange ? byDate.get(iso)?.count ?? 0 : 0,
          inRange,
        });
      }
      weeks.push(week);
    }

    // 月份标签：每周周日所在月与上一周不同月才显示
    const monthLabels = weeks.map((week, wi) => {
      const sunday = week[0];
      if (!sunday.inRange) return null;
      const m = new Date(sunday.iso + "T00:00:00").getMonth();
      const prev = wi > 0 ? new Date(weeks[wi - 1][0].iso + "T00:00:00").getMonth() : null;
      return prev !== m ? { wi, label: MONTHS[m] } : null;
    }).filter(Boolean);

    // 窗口内提交总数
    const total = yearData.contributions
      .filter((c) => c.date >= startIso && c.date <= endIso)
      .reduce((s, c) => s + (c.count || 0), 0);

    return {
      yearList: years,
      grid: { weeks, monthLabels, width: weeks.length * (CELL + GAP) - GAP },
      totalCommits: total,
      isCurrentYear: year === currentYear,
    };
  }, [data, year, currentYear]);

  if (error) return <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>热力图数据加载失败</p>;
  if (!data) return <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>加载热力图数据中...</p>;

  const height = MONTH_H + 7 * (CELL + GAP) - GAP;

  return (
    <div className="heatmap">
      <div className="heatmap-top">
        <div className="heatmap-title-group">
          <a
            className="heatmap-title"
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" style={{ verticalAlign: "-2px", marginRight: 6 }}>
              <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            @{username}
          </a>
        </div>
        <div className="heatmap-years" role="group" aria-label="年份切换">
          {yearList.map((y) => (
            <button
              key={y}
              type="button"
              className={`heatmap-year-btn${Number(y) === year ? " active" : ""}`}
              onClick={() => setYear(Number(y))}
              aria-pressed={Number(y) === year}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {grid && (
        <div className="heatmap-body">
          <svg
            viewBox={`0 0 ${grid.width} ${height}`}
            role="img"
            aria-label={`${year} 年 GitHub 提交热力图`}
            className="heatmap-svg"
          >
            <desc>共 {totalCommits} 次提交，颜色越深提交越多</desc>
            {/* 月份标签 */}
            {grid.monthLabels.map(({ wi, label }) => (
              <text
                key={wi}
                x={wi * (CELL + GAP)}
                y={11}
                fontFamily="'Microsoft YaHei',sans-serif"
                fontSize="11"
                fill="var(--text-muted)"
              >
                {label}
              </text>
            ))}
            {/* 提交格子 */}
            {grid.weeks.map((week, wi) =>
              week.map((day, di) => (
                <rect
                  key={day.iso}
                  x={wi * (CELL + GAP)}
                  y={MONTH_H + di * (CELL + GAP)}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={day.inRange ? LEVEL_COLORS[day.level] : "transparent"}
                >
                  {day.inRange && (
                    <title>
                      {day.count > 0
                        ? `${day.iso}：${day.count} 次提交`
                        : `${day.iso}：暂无提交`}
                    </title>
                  )}
                </rect>
              )),
            )}
          </svg>
          <div className="heatmap-legend">
            <span className="heatmap-legend-text">少</span>
            {LEVEL_COLORS.map((c) => (
              <span key={c} className="heatmap-cell" style={{ background: c }} />
            ))}
            <span className="heatmap-legend-text">多</span>
          </div>
        </div>
      )}

      <div className="heatmap-footer">
        {isCurrentYear ? "最近一年共" : `${year} 年共`} <strong>{totalCommits}</strong> 次提交
      </div>
    </div>
  );
}
