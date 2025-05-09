import path from "path";

import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port: 8000
  },
  resolve: {
      alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});