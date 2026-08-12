// 空状态组件（政务风）：无内容时展示插画式 SVG
export default function EmptyState({ message = "暂无内容" }) {
  return (
    <div className="empty-state">
      <svg
        width="120"
        height="100"
        viewBox="0 0 160 140"
        fill="none"
        aria-hidden="true"
        className="empty-state-illustration"
      >
        <defs>
          <linearGradient id="paper-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--wash)" />
            <stop offset="1" stopColor="var(--paper)" />
          </linearGradient>
          <linearGradient id="ink-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--navy-light)" />
            <stop offset="1" stopColor="var(--navy)" />
          </linearGradient>
        </defs>

        {/* 背景圆环装饰 */}
        <circle cx="80" cy="72" r="52" stroke="var(--wash-border)" strokeWidth="2" strokeDasharray="4 6" opacity="0.6" />

        {/* 文档主体 */}
        <rect x="48" y="18" width="52" height="66" rx="6" fill="url(#paper-g)" stroke="var(--wash-border)" strokeWidth="2" />
        {/* 文档折角 */}
        <path d="M74 18v14a6 6 0 0 0 6 6h14" fill="var(--wash)" stroke="var(--wash-border)" strokeWidth="2" strokeLinejoin="round" />
        {/* 文字行（浅灰） */}
        <rect x="56" y="42" width="30" height="4" rx="2" fill="var(--rule)" />
        <rect x="56" y="52" width="36" height="4" rx="2" fill="var(--rule)" />
        <rect x="56" y="62" width="24" height="4" rx="2" fill="var(--rule)" />

        {/* 放大镜（手柄穿过文档） */}
        <circle cx="96" cy="92" r="17" stroke="var(--accent-red)" strokeWidth="6" opacity="0.9" />
        <circle cx="96" cy="92" r="17" fill="var(--wash)" opacity="0.35" />
        <line x1="108" y1="104" x2="122" y2="118" stroke="var(--accent-red)" strokeWidth="6" strokeLinecap="round" />

        {/* 顶部红色装饰线（呼应政务红） */}
        <rect x="58" y="27" width="10" height="3" rx="1.5" fill="var(--accent-red)" />

        {/* 飘浮小点（装饰） */}
        <circle cx="118" cy="34" r="3" fill="var(--navy)" opacity="0.35" />
        <circle cx="34" cy="104" r="3" fill="var(--accent-red)" opacity="0.4" />
      </svg>
      <p className="empty-state-text">{message}</p>
    </div>
  );
}
