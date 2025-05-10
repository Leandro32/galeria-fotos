import path from "path";

import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ filename: "stats.html", open: true })
  ],
  server: {
    port: 8000
  },
  resolve: {
      alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});