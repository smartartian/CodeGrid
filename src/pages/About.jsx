import { site } from "../data.js";

export default function About() {
  return (
    <div className="article-page">
      <div className="section-head" style={{ marginTop: 0 }}>
        <span className="section-head-line" aria-hidden="true" />
        <h1 className="section-head-title">关于本站</h1>
      </div>

      <div className="prose">
        <p>
          {site.name}（{site.enName}）是一个个人技术博客，记录日常开发中的
          技术思考、踩坑经历与工程实践。本站内容以原创为主，聚焦前端、
          后端、工程化与架构设计。
        </p>

        <h2>内容分类</h2>
        <ul>
          <li>前端技术：React、Vite、TypeScript 等前端生态实践</li>
          <li>后端开发：数据库、服务端架构、接口设计</li>
          <li>工程效率：构建优化、Git 工作流、CI/CD</li>
          <li>运维与架构：部署、监控、系统设计</li>
        </ul>

        <h2>版权与转载</h2>
        <p>
          本站内容采用 CC BY-NC 4.0 许可协议，欢迎署名转载，
          但禁止商业用途。联系邮箱：
          <a href={`mailto:${site.email}`}> {site.email}</a>
        </p>

        <h2>技术栈</h2>
        <p>本站使用 Vite + React 构建，部署于静态托管平台。</p>
      </div>
    </div>
  );
}
