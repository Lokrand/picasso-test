import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/picasso-test/"
  base: "/",
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, ".src/shared"),
    },
  },
});
