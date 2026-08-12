import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 相对路径，兼容 GitHub Pages 子路径与自定义域名根路径
  base: "./",
});
