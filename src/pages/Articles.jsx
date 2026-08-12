import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { articles } from "../data.js";
import ArticleCard from "../components/ArticleCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Reveal from "../components/Reveal.jsx";
import TimelineCanvas from "../components/TimelineCanvas.jsx";

const PER_PAGE = 5;
const VIEWS = [
  { id: "list", label: "列表" },
  { id: "timeline", label: "时间线" },
];

export default function Articles() {
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, parseInt(params.get("page") ?? "1", 10) || 1);
  const [view, setView] = useState("list");

  // 按日期倒序排列
  const sorted = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const current = Math.min(page, totalPages);

  const start = (current - 1) * PER_PAGE;
  const list = sorted.slice(start, start + PER_PAGE);

  function goTo(p) {
    setParams(p > 1 ? { page: String(p) } : {}, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="article-page">
      <div className="article-headbar">
        <div className="section-head" style={{ marginTop: 0, marginBottom: 0 }}>
          <span className="section-head-line" aria-hidden="true" />
          <h1 className="section-head-title">文章</h1>
        </div>
        <div className="view-toggle" role="group" aria-label="视图切换">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`view-btn${view === v.id ? " active" : ""}`}
              onClick={() => setView(v.id)}
              aria-pressed={view === v.id}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {sorted.length === 0 ? (
        <EmptyState message="暂无文章，敬请期待" />
      ) : view === "list" ? (
        <>
          <p style={{ fontSize: "0.9rem", color: "var(--text-soft)", marginBottom: 16 }}>
            共 {sorted.length} 篇文章{totalPages > 1 ? `，第 ${current} / ${totalPages} 页` : ""}
          </p>

          <div className="article-list">
            {list.map((a, i) => (
              <Reveal key={a.id} delay={i * 60}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="pagination" aria-label="分页">
              <button
                className="page-btn"
                onClick={() => goTo(current - 1)}
                disabled={current <= 1}
              >
                上一页
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`page-btn${p === current ? " active" : ""}`}
                  onClick={() => goTo(p)}
                  aria-current={p === current ? "page" : undefined}
                >
                  {p}
                </button>
              ))}
              <button
                className="page-btn"
                onClick={() => goTo(current + 1)}
                disabled={current >= totalPages}
              >
                下一页
              </button>
            </nav>
          )}
        </>
      ) : (
        <section className="timeline-section" aria-label="文章时间线">
          <div className="timeline-section-head">
            <span className="timeline-section-line" aria-hidden="true" />
            <h2 className="timeline-section-title">时间线</h2>
            <span className="timeline-section-hint">可拖动 · 时间从左到右</span>
          </div>

          <TimelineCanvas articles={[...sorted].reverse()} />
        </section>
      )}
    </div>
  );
}
