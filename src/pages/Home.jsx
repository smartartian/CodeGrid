import { Link } from "react-router-dom";
import { articles } from "../data.js";
import GitHubHeatmap from "../components/GitHubHeatmap.jsx";
import ArticleCard from "../components/ArticleCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Reveal from "../components/Reveal.jsx";

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
      <Reveal>
        <GitHubHeatmap />
      </Reveal>

      {/* 最近文章 */}
      <Reveal delay={80}>
        <SectionTitle text="最近文章" />
      </Reveal>
      {latest.length === 0 ? (
        <EmptyState message="暂无文章" />
      ) : (
        <>
          <div className="article-list">
            {latest.map((a, i) => (
              <Reveal key={a.id} delay={120 + i * 60}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={600}>
            <div className="more-bar">
              <Link to="/articles" className="more-link">
                更多文章 »
              </Link>
            </div>
          </Reveal>
        </>
      )}
    </div>
  );
}
