import { Link, useParams, Navigate } from "react-router-dom";
import { articles, categories } from "../data.js";

export default function Category() {
  const { name } = useParams();
  const cat = categories.find((c) => c.name === name);

  if (!cat) return <Navigate to="/" replace />;

  const list = articles.filter((a) => a.category === name);

  return (
    <div className="article-page">
      <div className="section-head" style={{ marginTop: 0 }}>
        <span className="section-head-line" aria-hidden="true" />
        <h1 className="section-head-title">{name}</h1>
      </div>

      <p style={{ fontSize: "0.9rem", color: "var(--text-soft)", marginBottom: 16 }}>
        本分类共 {list.length} 篇文章
      </p>

      <div className="article-list">
        {list.map((a) => (
          <article key={a.id} className="article-card">
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
        ))}
      </div>
    </div>
  );
}
