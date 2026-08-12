import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-code" aria-hidden="true">
        404
      </div>
      <div className="notfound-line" aria-hidden="true" />
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
