import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";

// 非首页路由懒加载，按需拆包
const Article = lazy(() => import("./pages/Article.jsx"));
const Articles = lazy(() => import("./pages/Articles.jsx"));
const Category = lazy(() => import("./pages/Category.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));
const Collect = lazy(() => import("./pages/Collect.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="page-loading">加载中...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="/collect" element={<Collect />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
