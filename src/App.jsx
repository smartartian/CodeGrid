import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Article from "./pages/Article.jsx";
import Articles from "./pages/Articles.jsx";
import Category from "./pages/Category.jsx";
import Search from "./pages/Search.jsx";
import Collect from "./pages/Collect.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/search" element={<Search />} />
        <Route path="/collect" element={<Collect />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}
