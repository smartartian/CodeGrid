// 抽象环形徽标（政务风复刻，非真实国徽）
export default function Emblem({ size = 72 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="站点徽标"
    >
      <circle cx="50" cy="50" r="46" fill="#fff" stroke="#0d4a8a" strokeWidth="4" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="#c41e2a" strokeWidth="3" />
      <circle cx="50" cy="50" r="26" fill="#0d4a8a" />
      <circle cx="50" cy="50" r="17" fill="none" stroke="#fff" strokeWidth="3" />
      <circle cx="50" cy="50" r="9" fill="#c41e2a" />
      {/* 顶部小齿轮齿，呼应政务徽标的庄重感 */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const cx = 50 + Math.sin(angle) * 46;
        const cy = 50 - Math.cos(angle) * 46;
        return (
          <rect
            key={i}
            x={cx - 3.5}
            y={cy - 3.5}
            width="7"
            height="7"
            fill="#0d4a8a"
            transform={`rotate(${i * 45} ${cx} ${cy})`}
          />
        );
      })}
    </svg>
  );
}
