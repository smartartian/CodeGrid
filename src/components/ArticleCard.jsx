import { Link } from "react-router-dom";

// 带封面的文章卡片，首页与文章列表页共用
export default function ArticleCard({ article, showCover = true }) {
  return (
    <article className="article-card">
      <Link
        to={`/article/${article.id}`}
        className="article-card-cover"
        aria-label={article.title}
      >
        <img
          src={`/covers/${article.id}.svg`}
          alt={article.title}
          loading="lazy"
        />
      </Link>
      <div className="article-card-body">
        <Link to={`/article/${article.id}`} className="article-card-title">
          {article.title}
        </Link>
        <p className="article-card-summary">{article.summary}</p>
        <div className="article-card-meta">
          <span className="cat">{article.category}</span>
          <span>{article.date}</span>
          <span>{article.tags.join(" · ")}</span>
        </div>
      </div>
    </article>
  );
}
