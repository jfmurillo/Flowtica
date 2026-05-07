import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * GitHub Pages base URL for production assets and router basename.
 * - User/org site repo `username.github.io` is served at `https://username.github.io/` → base "/".
 * - Any other repo is a project site at `https://username.github.io/<repo>/` → base "/<repo>/".
 * - In GitHub Actions, `GITHUB_REPOSITORY` is set automatically (`owner/repo`).
 * - Override anytime with `VITE_GH_PAGES_BASE` (e.g. local `npm run build` for a project site).
 */
function ghPagesBase(): string {
  const explicit = process.env.VITE_GH_PAGES_BASE?.trim();
  if (explicit) {
    const withLeading = explicit.startsWith("/") ? explicit : `/${explicit}`;
    return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
  }

  const full = process.env.GITHUB_REPOSITORY;
  if (full) {
    const [owner, repo] = full.split("/");
    if (owner && repo) {
      const isUserOrOrgSite =
        repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;
      return isUserOrOrgSite ? "/" : `/${repo}/`;
    }
  }

  // Local build with VITE_DEPLOY_TARGET=gh-pages but no CI: default to root.
  return "/";
}

const base =
  process.env.VITE_DEPLOY_TARGET === "gh-pages" ? ghPagesBase() : "/";

export default defineConfig({
  base,
  plugins: [react()],
});
