import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// On GitHub Pages the site is served from /<repo>/, so we need a base path.
// In local dev (and other deploys) base stays "/".
const base = process.env.VITE_DEPLOY_TARGET === "gh-pages" ? "/dayana-web/" : "/";

export default defineConfig({
  base,
  plugins: [react()],
});
