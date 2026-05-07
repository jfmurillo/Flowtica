# Flowtica — Marketing Site

A bilingual (EN/ES) marketing site for **Flowtica**, a media buyer / trafficker / analyst / growth team. Built with React + Vite + TypeScript, Framer Motion, and React Router.

## Stack

- **React 19** + **Vite** + **TypeScript**
- **React Router** — multi-page navigation (Home / Foundation / Mission)
- **Framer Motion** — entrance, scroll, and section transitions
- **i18next** + **react-i18next** — English / Spanish toggle (with browser-language detection)
- **@emailjs/browser** — contact form submissions (no backend required)

## Theming

The site ships in **light theme by default** (sky blue · white · bone white palette) with a one-click toggle to a curated dark theme that derives from the same brand blues. Theme preference is persisted in `localStorage` under the key `flowtica-theme`.

## Getting started

```bash
npm install
cp .env.example .env  # then fill in the values
npm run dev
```

The site runs at http://localhost:5173 by default.

## Environment variables

| Variable | What it does |
|----------|--------------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID — must accept `first_name`, `last_name`, `email`, `linkedin`, `phone`, `message` variables |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_CALENDLY_URL` | Calendly link the floating button + every "Let's Talk Growth" CTA opens (defaults to `https://calendly.com/dayanamurilloc/30min`) |

If EmailJS variables are not set, the form runs in **demo mode** — it will simulate a successful submission so the UI can be reviewed.

### Setting up EmailJS

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Add an email service (Gmail, Outlook, etc.).
3. Create a template using these variables: `{{first_name}}`, `{{last_name}}`, `{{email}}`, `{{linkedin}}`, `{{phone}}`, `{{message}}`.
4. Copy the Service ID, Template ID, and Public Key into `.env`.

## Project structure

```
src/
├── components/
│   ├── Loader.tsx              Opening animation (Flowtica logo)
│   ├── Navbar.tsx              Top bar + page links + CTA + flag switcher + theme toggle + drawer
│   ├── HeroSection.tsx         Home hero: "MEDIA" + animated roles
│   ├── ServicesSection.tsx     3 service cards on the home page
│   ├── GrowthCallCard.tsx      Calendar + chart "Growth Strategy Call" CTA card
│   ├── ComparisonSection.tsx   "Traditional Agency vs Flowtica" two-card comparison
│   ├── HowItWorksSection.tsx   4-step horizontal "How it works" sequence
│   ├── ContactForm.tsx         "Let's talk growth!" split card + EmailJS-powered form
│   ├── TalkGrowthCard.tsx      Reusable green-CTA "Let's talk growth" strip card
│   ├── Footer.tsx              Brand · links · social icons + blue copyright bar
│   ├── CalendlyButton.tsx      Floating bottom-left Calendly badge
│   ├── ThemeToggle.tsx         Sun/moon theme toggle
│   └── Icons.tsx               Centralized inline SVG icon set
├── pages/
│   ├── HomePage.tsx            "/"  — hero, services, comparison, how-it-works, form
│   ├── FoundationPage.tsx      "/foundation" — hero, 6-step "How we work", about+focus, quote, CTA
│   └── MissionPage.tsx         "/mission" — hero, pillars, CTA
├── hooks/
│   ├── useTheme.ts             Light/dark theme state (defaults to light)
│   └── useCalendly.ts          Reads VITE_CALENDLY_URL with safe fallback
├── locales/
│   ├── en.json                 English copy
│   └── es.json                 Spanish copy
├── i18n.ts                     i18next setup
├── App.tsx                     Router + shell wiring
├── main.tsx                    Entry
└── index.css                   All styling (CSS variables drive the theme system)
```

## Customization

- **Brand colors** — edit the CSS variables at the top of `src/index.css` (`--brand`, `--bg`, `--bg-bone`, etc.). The dark theme overrides live under `[data-theme="dark"]` further down the same file.
- **Copy / translations** — edit `src/locales/en.json` and `src/locales/es.json`.
- **Calendly link** — change `VITE_CALENDLY_URL` in `.env` (defaults to Dayana's link).

## Build for production

```bash
npm run build
npm run preview
```

The build output goes to `dist/` and can be deployed to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.).

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) that auto-deploys to GitHub Pages on every push to `main`.

### One-time setup

1. **Push the repo to GitHub.** From the project root:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages.** Repo → **Settings → Pages → Build and deployment → Source = "GitHub Actions"**.

   If Source is set to **Deploy from a branch** (e.g. `/ (root)`), GitHub serves your raw repo files. The browser then loads `/src/main.tsx` from `index.html` and gets **404** — that path only exists during `npm run dev`. You must use **GitHub Actions** so the workflow uploads the Vite **`dist/`** build (see [.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

3. **Add EmailJS + Calendly secrets.** Repo → **Settings → Secrets and variables → Actions → New repository secret**:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_CALENDLY_URL`

4. **Lock down EmailJS to your domain (recommended).** EmailJS Dashboard → Account → Security → enable "Allow EmailJS to be used from these websites only" and add your production URL.

### If you change the repo name

No manual edit is required in CI: the build reads `GITHUB_REPOSITORY` and sets Vite `base` to `/<repo>/` for project sites, or `/` for a `username.github.io` user-site repo. For a **local** production build aimed at a project site, set `VITE_GH_PAGES_BASE`, for example:

`VITE_DEPLOY_TARGET=gh-pages VITE_GH_PAGES_BASE=/my-repo/ npm run build`

> ⚠️ **Note about routing on GitHub Pages.** Because Flowtica uses client-side routing, you may need a 404 fallback to make `/foundation` and `/mission` reload correctly when accessed directly. The standard fix is to add a `public/404.html` that redirects to `index.html`, or switch to a hash-based router if direct deep links matter.
