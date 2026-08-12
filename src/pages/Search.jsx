import { Link, useSearchParams } from "react-router-dom";
import { articles, tags } from "../data.js";
import Reveal from "../components/Reveal.jsx";

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim().toLowerCase();

  const results = q
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.category.toLowerCase().includes(q),
      )
    : [];

  return (
    <div className="article-page">
      <div className="section-head" style={{ marginTop: 0 }}>
        <span className="section-head-line" aria-hidden="true" />
        <h1 className="section-head-title">
          {q ? `搜索“${q}”` : "站内搜索"}
        </h1>
      </div>

      {q && (
        <p style={{ fontSize: "0.9rem", color: "var(--text-soft)", marginBottom: 16 }}>
          找到 {results.length} 条结果
        </p>
      )}

      {results.length === 0 ? (
        <div style={{ padding: "30px 0", fontSize: "0.95rem", color: "var(--text-soft)" }}>
          {q ? (
            <>
              没有找到与“{q}”相关的内容，请尝试其他关键词。
              <div className="tag-list" style={{ marginTop: 16 }}>
                {tags.map((t) => (
                  <Link key={t} to={`/search?q=${encodeURIComponent(t)}`} className="tag">
                    {t}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>请输入关键词进行站内搜索。</>
          )}
        </div>
      ) : (
        <div className="article-list">
          {results.map((a, i) => (
            <Reveal key={a.id} delay={i * 60}>
              <article className="article-card">
                <Link to={`/article/${a.id}`} className="article-card-title">
                  {a.title}
                </Link>
                <p className="article-card-summary">{a.summary}</p>
                <div className="article-card-meta">
                  <span className="cat">{a.category}</span>
                  <span>{a.date}</span>
                  <span>{a.tags.join(" · ")}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
