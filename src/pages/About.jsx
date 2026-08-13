export default function About() {
  return (
    <div className="article-page">
      <div className="section-head" style={{ marginTop: 0 }}>
        <span className="section-head-line" aria-hidden="true" />
        <h1 className="section-head-title">关于本站</h1>
      </div>

      <blockquote className="about-quote">
        <p>
          如果我们选择了最能为人类福利而劳动的职业，那么，重担就不能把我们压倒，因为这是为大家而献身；那时我们所感到的就不是可怜的、有限的、自私的乐趣，我们的幸福将属于千百万人，我们的事业将默默地、但是永恒发挥作用地存在下去，面对我们的骨灰，高尚的人们将洒下热泪。
        </p>
        <footer className="about-quote-author">—— 卡尔·马克思</footer>
      </blockquote>

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
