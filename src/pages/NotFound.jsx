import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound">
      <svg
        width="240"
        height="170"
        viewBox="0 0 240 170"
        fill="none"
        aria-hidden="true"
        className="notfound-illustration"
      >
        <defs>
          <linearGradient id="nf-404" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--navy-light)" />
            <stop offset="1" stopColor="var(--navy)" />
          </linearGradient>
          <linearGradient id="nf-lens" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--wash)" />
            <stop offset="1" stopColor="var(--paper)" />
          </linearGradient>
        </defs>

        {/* 背景双环装饰 */}
        <circle cx="120" cy="90" r="70" stroke="var(--wash-border)" strokeWidth="2" strokeDasharray="4 7" opacity="0.55" />
        <circle cx="120" cy="90" r="84" stroke="var(--wash-border)" strokeWidth="1.5" strokeDasharray="2 8" opacity="0.35" />

        {/* 404 阴影层（立体感） */}
        <text
          x="123"
          y="119"
          textAnchor="middle"
          fontFamily="'Microsoft YaHei','PingFang SC',sans-serif"
          fontSize="84"
          fontWeight="800"
          fill="var(--navy)"
          opacity="0.14"
          letterSpacing="3"
        >
          404
        </text>

        {/* 404 主体 */}
        <text
          x="120"
          y="116"
          textAnchor="middle"
          fontFamily="'Microsoft YaHei','PingFang SC',sans-serif"
          fontSize="84"
          fontWeight="800"
          fill="url(#nf-404)"
          letterSpacing="3"
        >
          404
        </text>

        {/* 第二个 0 的红色断裂缺口 */}
        <path
          d="M158 60l15 15-10 11 10 12-20 10-8-17-15 10-5-15 13-8-8-12 15-9z"
          fill="var(--accent-red)"
          opacity="0.92"
        />

        {/* 碎片飞散（断裂弹出） */}
        <path d="M182 88l9 5-4.5 9-9-5z" fill="var(--navy)" opacity="0.35" />
        <path d="M192 66l6-3 2 6-6 3z" fill="var(--accent-red)" opacity="0.45" />
        <circle cx="204" cy="104" r="4" fill="var(--navy)" opacity="0.3" />
        <circle cx="180" cy="52" r="3.5" fill="var(--accent-red)" opacity="0.4" />

        {/* 放大镜（"找不到"语义，左上悬停） */}
        <circle cx="58" cy="58" r="17" fill="url(#nf-lens)" stroke="var(--navy-light)" strokeWidth="3" opacity="0.92" />
        <circle cx="58" cy="58" r="10" stroke="var(--navy-light)" strokeWidth="1.5" opacity="0.35" />
        <line x1="70" y1="70" x2="84" y2="84" stroke="var(--accent-red)" strokeWidth="5" strokeLinecap="round" />

        {/* 问号（右上，辅助"找不到"） */}
        <text
          x="188"
          y="40"
          textAnchor="middle"
          fontFamily="'Microsoft YaHei','PingFang SC',sans-serif"
          fontSize="26"
          fontWeight="700"
          fill="var(--text-muted)"
        >
          ?
        </text>

        {/* 底部红色装饰线 + 端点 */}
        <rect x="92" y="138" width="56" height="4" rx="2" fill="var(--accent-red)" />
        <circle cx="84" cy="140" r="3" fill="var(--accent-red)" opacity="0.6" />
        <circle cx="156" cy="140" r="3" fill="var(--accent-red)" opacity="0.6" />
      </svg>

      <h1 className="notfound-title">页面不存在</h1>
      <p className="notfound-desc">
        您访问的页面可能已被移除或地址有误。
      </p>
      <Link to="/" className="notfound-btn">
        返回首页
      </Link>
    </div>
  );
}
