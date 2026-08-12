import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Emblem from "./Emblem.jsx";
import { site } from "../data.js";

const WEEKDAYS = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

const navItems = [
  { to: "/", label: "首页" },
  { to: "/articles", label: "文章" },
  { to: "/collect", label: "收录" },
  { to: "/about", label: "关于" },
];

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now;
}

function formatNow(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}年${pad(d.getMonth() + 1)}月${pad(d.getDate())}日 ${WEEKDAYS[d.getDay()]} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const now = useNow();
  const [showTop, setShowTop] = useState(false);
  const [dark, setDark] = useState(() => {
    // 优先用本地保存的主题，否则跟随系统
    const saved = localStorage.getItem("codegrid-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // 回到顶部按钮：滚动超过 400px 才显示
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 明暗色模式应用到 <html>，并持久化
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("codegrid-theme", dark ? "dark" : "light");
  }, [dark]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
    <div className="app-shell">
      {/* 顶部工具栏：日期 + 辅助链接 */}
      <div className="topbar">
        <div className="container topbar-inner">
          <span className="topbar-date">{formatNow(now)}</span>
          <div className="topbar-links">
            <a href="/feed.xml" target="_blank" rel="noopener">RSS 订阅</a>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setDark((d) => !d)}
              aria-label={dark ? "切换到明色模式" : "切换到暗色模式"}
            >
              {dark ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
              {dark ? "明色模式" : "暗色模式"}
            </button>
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

      <main id="main" className="container app-main">
        <div key={location.pathname} className="page-enter">
          {children}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-links">
            <Link to="/">首页</Link>
            <Link to="/about">关于本站</Link>
            <a href={`mailto:${site.email}`}>联系我们</a>
            <a href="/feed.xml" target="_blank" rel="noopener">RSS 订阅</a>
          </div>
          <div className="footer-meta">
            © {new Date().getFullYear()} {site.name} 版权所有
          </div>
        </div>
      </footer>
      {/* 回到顶部按钮 */}
      <button
        type="button"
        className={`back-to-top${showTop ? " visible" : ""}`}
        onClick={scrollToTop}
        aria-label="回到顶部"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
