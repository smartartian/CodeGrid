import { Link, useLocation, useNavigate } from "react-router-dom";
import Emblem from "./Emblem.jsx";
import { site } from "../data.js";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/articles", label: "文章" },
  { to: "/collect", label: "收录" },
  { to: "/about", label: "关于" },
];

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const q = new FormData(e.target).get("q").trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  function isActive(to) {
    if (to === "/") return location.pathname === "/";
    if (to.startsWith("/category/"))
      return location.pathname.startsWith("/category/");
    return location.pathname.startsWith(to);
  }

  return (
    <div>
      {/* 顶部工具栏：日期 + 辅助链接 */}
      <div className="topbar">
        <div className="container topbar-inner">
          <span className="topbar-date">{site.today}</span>
          <div className="topbar-links">
            <a href="#lang">简体中文</a>
          </div>
        </div>
      </div>

      {/* 头部：徽标 + 名称 + 搜索 */}
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="brand">
            <Emblem />
            <div>
              <div className="brand-title">{site.name}</div>
              <div className="brand-subtitle">{site.enName}</div>
            </div>
          </Link>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              className="search-input"
              type="search"
              name="q"
              placeholder="站内搜索文章..."
              aria-label="站内搜索"
            />
            <button className="search-btn" type="submit">
              搜索
            </button>
          </form>
        </div>
      </header>

      {/* 主导航：深蓝横向菜单 */}
      <nav className="nav" aria-label="主导航">
        <div className="container nav-inner">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-item${isActive(item.to) ? " active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <main id="main" className="container">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-links">
            <Link to="/">首页</Link>
            <Link to="/about">关于本站</Link>
            <a href={`mailto:${site.email}`}>联系我们</a>
            <a href="/feed.xml" target="_blank" rel="noopener">RSS 订阅</a>
            <a href="#top">回到顶部</a>
          </div>
          <div className="footer-meta">
            {site.name} · {site.icp} · 本站内容采用 CC BY-NC 4.0 许可
          </div>
        </div>
      </footer>
    </div>
  );
}
