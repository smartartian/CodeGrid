import EmptyState from "../components/EmptyState.jsx";

export default function About() {
  return (
    <div className="article-page">
      <div className="section-head" style={{ marginTop: 0 }}>
        <span className="section-head-line" aria-hidden="true" />
        <h1 className="section-head-title">关于本站</h1>
      </div>

      <EmptyState message="待补充" />

      {/* 关联站点 */}
      <div className="section-head" style={{ marginTop: 44 }}>
        <span className="section-head-line" aria-hidden="true" />
        <h2 className="section-head-title">关联站点</h2>
      </div>
      <div className="site-links">
        <a
          className="site-link"
          href="http://39.105.55.81:9100/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="site-link-name">蚍蜉导航</span>
          <span className="site-link-url">39.105.55.81:9100</span>
        </a>
        <a
          className="site-link"
          href="https://smartartian.github.io/Skeuomorphism/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="site-link-name">Skeuomorphism</span>
          <span className="site-link-url">smartartian.github.io/Skeuomorphism</span>
        </a>
        <a
          className="site-link"
          href="https://smartartian.github.io/smartisan-icon/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="site-link-name">Smartisan 图标</span>
          <span className="site-link-url">smartartian.github.io/smartisan-icon</span>
        </a>
        <a
          className="site-link"
          href="https://blog.justdev.cn/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="site-link-name">JustDev 博客</span>
          <span className="site-link-url">blog.justdev.cn</span>
        </a>
      </div>
    </div>
  );
}
