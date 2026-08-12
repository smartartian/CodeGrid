const groups = [
  {
    title: "技术社区",
    items: [
      { name: "GitHub", desc: "代码托管与开源协作平台", url: "https://github.com" },
      { name: "Stack Overflow", desc: "开发者问答社区", url: "https://stackoverflow.com" },
      { name: "Hacker News", desc: "科技新闻与讨论", url: "https://news.ycombinator.com" },
      { name: "V2EX", desc: "创意工作者社区", url: "https://v2ex.com" },
    ],
  },
  {
    title: "学习资源",
    items: [
      { name: "MDN Web Docs", desc: "Web 技术权威文档", url: "https://developer.mozilla.org" },
      { name: "TypeScript 官方文档", desc: "TypeScript 语言手册", url: "https://www.typescriptlang.org/docs" },
      { name: "Rust 程序设计语言", desc: "Rust 官方入门书籍（中文版）", url: "https://kaisery.github.io/trpl-zh-cn/" },
      { name: "系统设计入门", desc: "The System Design Primer（中文版）", url: "https://github.com/donnemartin/system-design-primer" },
    ],
  },
  {
    title: "工具站点",
    items: [
      { name: "Can I use", desc: "浏览器兼容性查询", url: "https://caniuse.com" },
      { name: "regex101", desc: "正则表达式在线调试", url: "https://regex101.com" },
      { name: "Excalidraw", desc: "手绘风格白板绘图", url: "https://excalidraw.com" },
      { name: "Carbon", desc: "代码截图美化", url: "https://carbon.now.sh" },
    ],
  },
  {
    title: "友链",
    items: [
      { name: "示例博客 A", desc: "前端工程实践分享", url: "https://blog.codegrid.cn" },
      { name: "示例博客 B", desc: "后端与架构笔记", url: "https://blog.codegrid.cn" },
    ],
  },
];

export default function Collect() {
  return (
    <div className="article-page">
      <div className="section-head" style={{ marginTop: 0 }}>
        <span className="section-head-line" aria-hidden="true" />
        <h1 className="section-head-title">收录</h1>
      </div>

      <p style={{ fontSize: "0.9rem", color: "var(--text-soft)", marginBottom: 16 }}>
        日常使用与推荐的技术社区、学习资源、工具站点与友链
      </p>

      {groups.map((g) => (
        <div key={g.title}>
          <div className="section-head" style={{ margin: "30px 0 14px" }}>
            <span className="section-head-line" aria-hidden="true" />
            <h2 className="section-head-title" style={{ fontSize: "1.15rem" }}>
              {g.title}
            </h2>
          </div>
          <ul className="collect-list" style={{ marginBottom: 10 }}>
            {g.items.map((item) => (
              <li key={item.name} className="collect-row">
                <a href={item.url} target="_blank" rel="noreferrer" className="collect-name">
                  {item.name}
                </a>
                <span className="collect-desc">{item.desc}</span>
                <span className="collect-url">{item.url.replace(/^https?:\/\//, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
