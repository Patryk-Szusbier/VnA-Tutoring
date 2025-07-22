import { defineConfig } from "vite";
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
      open: true, // Zmień na true, jeśli chcesz otwierać automatycznie po buildzie
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    sourcemap: true, // Umożliwia analizę nieużywanego kodu w Lighthouse
    minify: "esbuild", // lub 'terser' jeśli chcesz dokładniejszą minifikację
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Dziel duże biblioteki na osobne pliki
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "vendor_framer";
            if (id.includes("emailjs")) return "vendor_email";
            if (id.includes("react-toastify")) return "vendor_toastify";
            return "vendor";
          }
        },
      },
    },
  },
});
