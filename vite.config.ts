import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({
      algorithm: "gzip",
      threshold: 1024, // Kompresuj pliki większe niż 1KB
    }),
    visualizer({
      filename: "dist/stats.html",
      open: false, // Zmień na true, jeśli chcesz otwierać automatycznie po buildzie
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  test: {
    environment: "jsdom",
    restoreMocks: true,
    setupFiles: "./src/test/setup.ts",
  },
  build: {
    sourcemap: true, // Umożliwia analizę nieużywanego kodu w Lighthouse
    minify: "esbuild", // lub 'terser' jeśli chcesz dokładniejszą minifikację
  },
});
