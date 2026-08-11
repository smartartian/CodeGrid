import { Link, useParams, Navigate } from "react-router-dom";
import { articles } from "../data.js";

export default function Article() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  if (!article) return <Navigate to="/" replace />;

  // 按日期倒序的完整列表，用于上一篇/下一篇
  const sorted = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
  const idx = sorted.findIndex((a) => a.id === article.id);
  const prev = sorted[idx - 1];
  const next = sorted[idx + 1];

  const related = articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 4);

  return (
    <div className="article-page">
      <article>
        <h1 className="article-h1">{article.title}</h1>
        <div className="article-sub">
          <span>发布日期：{article.date}</span>
          <span>分类：<span className="pill cat-pill">{article.category}</span></span>
          <span>标签：{article.tags.map((t) => <span key={t} className="pill tag-pill">{t}</span>)}</span>
        </div>

        <div className="prose">{renderMarkdown(article.content)}</div>
      </article>

      {/* 相关文章：置于文章结尾 */}
      <div className="section-head" style={{ marginTop: 40 }}>
        <span className="section-head-line" aria-hidden="true" />
        <h2 className="section-head-title">相关文章</h2>
      </div>
      <ul className="related-list" style={{ marginBottom: 10 }}>
        {related.map((a) => (
          <li key={a.id} className="related-row">
            <Link to={`/article/${a.id}`} className="related-title">
              {a.title}
            </Link>
            <span className="related-date">{a.date}</span>
          </li>
        ))}
      </ul>

      {/* 上一篇 / 下一篇 */}
      <nav className="prevnext" aria-label="上一篇与下一篇">
        <div className="prevnext-item">
          {prev ? (
            <>
              <span className="prevnext-label">« 上一篇</span>
              <Link to={`/article/${prev.id}`} className="prevnext-link">
                {prev.title}
              </Link>
            </>
          ) : (
            <span className="prevnext-empty">已是第一篇</span>
          )}
        </div>
        <div className="prevnext-item is-next">
          {next ? (
            <>
              <span className="prevnext-label">下一篇 »</span>
              <Link to={`/article/${next.id}`} className="prevnext-link">
                {next.title}
              </Link>
            </>
          ) : (
            <span className="prevnext-empty">已是最后一篇</span>
          )}
        </div>
      </nav>
    </div>
  );
}

// 极简 Markdown 渲染：标题 / 段落 / 列表 / 代码块 / 引用 / 表格 / 行内代码
function renderMarkdown(md) {
  const lines = md.split("\n");
  const out = [];
  let i = 0;
  let list = null; // { type: "ul" | "ol", items: string[] }
  let table = null; // { head: string[], rows: string[][] }
  let code = null; // string[] | null
  let quote = null; // string[] | null

  function flushList() {
    if (list) {
      const Tag = list.type;
      out.push(
        <Tag key={out.length}>
          {list.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inline(item) }} />
          ))}
        </Tag>,
      );
      list = null;
    }
  }
  function flushTable() {
    if (table) {
      out.push(
        <table key={out.length}>
          <thead>
            <tr>
              {table.head.map((c, i) => (
                <th key={i} dangerouslySetInnerHTML={{ __html: inline(c) }} />
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((c, ci) => (
                  <td key={ci} dangerouslySetInnerHTML={{ __html: inline(c) }} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>,
      );
      table = null;
    }
  }
  function flushQuote() {
    if (quote) {
      out.push(
        <blockquote key={out.length}>
          {quote.map((t, i) => (
            <p key={i}>{inline(t)}</p>
          ))}
        </blockquote>,
      );
      quote = null;
    }
  }
  function inline(text) {
    return text
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }

  for (; i < lines.length; i++) {
    const line = lines[i];

    // 代码块
    if (line.startsWith("```")) {
      flushList();
      flushTable();
      flushQuote();
      if (code) {
        out.push(<pre key={out.length}><code>{code.join("\n")}</code></pre>);
        code = null;
      } else {
        code = [];
      }
      continue;
    }
    if (code) {
      code.push(line);
      continue;
    }

    // 空行
    if (line.trim() === "") {
      flushList();
      flushTable();
      flushQuote();
      continue;
    }

    // 表格
    if (line.trim().startsWith("|")) {
      flushList();
      flushQuote();
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      if (table) {
        if (cells.every((c) => /^:?-{2,}:?$/.test(c))) {
          continue; // 分隔行
        }
        table.rows.push(cells);
      } else {
        table = { head: cells, rows: [] };
      }
      continue;
    }

    // 块级图片
    const img = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    if (img) {
      flushList();
      flushTable();
      flushQuote();
      out.push(
        <figure key={out.length} className="prose-figure">
          <img src={img[2]} alt={img[1]} loading="lazy" />
          {img[1] && <figcaption>{img[1]}</figcaption>}
        </figure>,
      );
      continue;
    }

    // 引用
    if (line.startsWith("> ")) {
      flushList();
      flushTable();
      if (!quote) quote = [];
      quote.push(line.slice(2));
      continue;
    }

    // 无序列表
    if (/^\s*[-*] /.test(line)) {
      flushTable();
      flushQuote();
      if (!list || list.type !== "ul") {
        if (list) flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(line.replace(/^\s*[-*] /, ""));
      continue;
    }

    // 有序列表
    if (/^\s*\d+\. /.test(line)) {
      flushTable();
      flushQuote();
      if (!list || list.type !== "ol") {
        if (list) flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push(line.replace(/^\s*\d+\. /, ""));
      continue;
    }

    flushList();
    flushTable();
    flushQuote();

    // 标题
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const Tag = `h${level}`;
      out.push(
        <Tag key={out.length} dangerouslySetInnerHTML={{ __html: inline(h[2]) }} />
      );
      continue;
    }

    // 段落
    out.push(<p key={out.length} dangerouslySetInnerHTML={{ __html: inline(line) }} />);
  }

  flushList();
  flushTable();
  flushQuote();
  if (code) out.push(<pre key={out.length}><code>{code.join("\n")}</code></pre>);

  return out;
}
