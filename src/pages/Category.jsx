import { Link, useParams, Navigate } from "react-router-dom";
import { articles, categories } from "../data.js";
import Reveal from "../components/Reveal.jsx";

export default function Category() {
  const { name } = useParams();
  const cat = categories.find((c) => c.name === name);

  if (!cat) return <Navigate to="/" replace />;

  const list = articles.filter((a) => a.category === name);

  return (
    <div className="article-page">
      <Reveal>
        <div className="section-head" style={{ marginTop: 0 }}>
          <span className="section-head-line" aria-hidden="true" />
          <h1 className="section-head-title">{name}</h1>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <p style={{ fontSize: "0.9rem", color: "var(--text-soft)", marginBottom: 16 }}>
          本分类共 {list.length} 篇文章
        </p>
      </Reveal>

      <div className="article-list">
        {list.map((a, i) => (
          <Reveal key={a.id} delay={100 + i * 60}>
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
    </div>
  );
}
