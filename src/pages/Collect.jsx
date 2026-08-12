import EmptyState from "../components/EmptyState.jsx";

export default function Collect() {
  return (
    <div className="article-page">
      <div className="section-head" style={{ marginTop: 0 }}>
        <span className="section-head-line" aria-hidden="true" />
        <h1 className="section-head-title">收录</h1>
      </div>

      <EmptyState message="待补充" />
    </div>
  );
}
