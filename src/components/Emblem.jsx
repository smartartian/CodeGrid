// 代码网格徽标 v4：白色背景 + 深蓝网格线 + 中心红色代码尖括号
export default function Emblem({ size = 72 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="代码网格 CodeGrid 站点徽标"
    >
      {/* 白色圆角方形背景 */}
      <rect x="8" y="8" width="84" height="84" rx="16" fill="#ffffff" stroke="#d9e2ec" strokeWidth="2" />

      {/* 3×3 网格线（深蓝，突出） */}
      <g stroke="#0d4a8a" strokeWidth="2.4" opacity="0.55">
        <line x1="22" y1="33" x2="78" y2="33" />
        <line x1="22" y1="50" x2="78" y2="50" />
        <line x1="22" y1="67" x2="78" y2="67" />
        <line x1="33" y1="22" x2="33" y2="78" />
        <line x1="50" y1="22" x2="50" y2="78" />
        <line x1="67" y1="22" x2="67" y2="78" />
      </g>

      {/* 中心红色代码尖括号 </> */}
      <g stroke="#c41e2a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M39 40 L29 50 L39 60" />
        <path d="M61 40 L71 50 L61 60" />
        <path d="M55 35 L45 65" />
      </g>
    </svg>
  );
}
