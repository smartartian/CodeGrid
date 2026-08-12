import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFile } from "node:fs/promises";

// GitHub Pages 无 history fallback：构建产物中生成 404.html（内容=index.html），
// 使浏览器直接访问 /article/xxx 或刷新时由 SPA 接管渲染
function spaFallback() {
  return {
    name: "spa-fallback",
    closeBundle: async () => {
      await copyFile("dist/index.html", "dist/404.html");
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallback()],
  base: "./",
});
