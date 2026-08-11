import { Link } from "react-router-dom";
import { articles } from "../data.js";
import GitHubHeatmap from "../components/GitHubHeatmap.jsx";
import ArticleCard from "../components/ArticleCard.jsx";

function SectionTitle({ text }) {
  return (
    <div className="section-head">
      <span className="section-head-line" aria-hidden="true" />
      <h2 className="section-head-title">{text}</h2>
    </div>
  );
}

export default function Home() {
  const latest = articles.slice(0, 8);

  return (
    <div>
      {/* GitHub 提交热力图 */}
      <GitHubHeatmap />

      {/* 最近文章 */}
      <SectionTitle text="最近文章" />
      <div className="article-list">
        {latest.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
      <div className="more-bar">
        <Link to="/articles" className="more-link">
          更多文章 »
        </Link>
      </div>
    </div>
  );
}
