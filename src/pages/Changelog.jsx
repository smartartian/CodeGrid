import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";

// 更新日志数据（整理自 git 历史，按版本分组，时间倒序）
const changelog = [
  {
    version: "v0.1.0",
    date: "2026-08-11",
    tag: "上线",
    items: [
      "代码网格 CodeGrid 政务风个人技术博客上线",
      "文章改为 .md 文件管理，GitHub 自动构建部署",
      "自定义域名 blog.codegrid.cn",
    ],
  },
];

export default function Changelog() {
  return (
    <div className="article-page">
      <Reveal>
        <div className="section-head" style={{ marginTop: 0 }}>
          <span className="section-head-line" aria-hidden="true" />
          <h1 className="section-head-title">更新日志</h1>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <p style={{ fontSize: "0.9rem", color: "var(--text-soft)", marginBottom: 20 }}>
          记录本站的功能迭代与改进
        </p>
      </Reveal>

      <div className="changelog">
        {changelog.map((v, i) => (
          <Reveal key={v.version} delay={i * 80}>
            <section className="changelog-group">
              <div className="changelog-head">
                <span className="changelog-version">{v.version}</span>
                <span className="changelog-tag">{v.tag}</span>
                <span className="changelog-date">{v.date}</span>
              </div>
              <ul className="changelog-list">
                {v.items.map((item) => (
                  <li key={item} className="changelog-item">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="more-bar">
          <Link to="/" className="more-link">
            返回首页 »
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
