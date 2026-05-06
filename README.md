# Dayana Media — Portfolio Website

A bilingual (EN/ES) portfolio site for a media buyer / trafficker / analyst, built with React + Vite + TypeScript and Framer Motion animations.

## Stack

- **React 19** + **Vite** + **TypeScript**
- **Framer Motion** — entrance, scroll, and section transitions
- **i18next** + **react-i18next** — English / Spanish toggle (with browser-language detection)
- **@emailjs/browser** — contact form submissions (no backend required)

## Getting started

```bash
npm install
cp .env.example .env  # then fill in the values
npm run dev
```

The site runs at http://localhost:5173 by default.

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | What it does |
|----------|--------------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID — must accept `first_name`, `last_name`, `email`, `social`, `message` variables |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_CALENDLY_URL` | Calendly link the floating button opens |

If EmailJS variables are not set, the form runs in **demo mode** — it will simulate a successful submission so the UI can be reviewed. Configure EmailJS to send real emails.

### Setting up EmailJS

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Add an email service (Gmail, Outlook, etc.).
3. Create a template using these variables: `{{first_name}}`, `{{last_name}}`, `{{email}}`, `{{social}}`, `{{message}}`.
4. Copy the Service ID, Template ID, and Public Key into `.env`.

## Project structure

```
src/
├── components/
│   ├── Loader.tsx           Opening animation
│   ├── Navbar.tsx           Top bar + flag switcher + burger drawer
│   ├── HeroSection.tsx      "Media" + animated roles
│   ├── ServicesSection.tsx  3 icon cards + Strategy Call CTA
│   ├── GrowthSection.tsx    "Let's talk growth" + bullets
│   ├── ContactForm.tsx      EmailJS-powered form
│   ├── Footer.tsx           Centered links + popup modals
│   ├── CalendlyButton.tsx   Floating bottom-left button
│   └── InfoTooltip.tsx      Reusable info / disclaimer tooltip
├── locales/
│   ├── en.json              English copy
│   └── es.json              Spanish copy
├── i18n.ts                  i18next setup
├── App.tsx                  Page wiring
├── main.tsx                 Entry
└── index.css                All styling
```

## Customization

- **Brand colors** — edit the CSS variables at the top of `src/index.css` (`--accent`, `--bg`, etc.).
- **Copy / translations** — edit `src/locales/en.json` and `src/locales/es.json`.
- **Roles** — change `hero.roles` in both locale files.
- **Footer modals** — wire links in `Footer.tsx` to real pages once content is ready.

## Build for production

```bash
npm run build
npm run preview  # preview the production build locally
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
   git remote add origin https://github.com/<your-username>/dayana-web.git
   git push -u origin main
   ```

2. **Enable GitHub Pages.** Repo → **Settings → Pages → Source = "GitHub Actions"**.

3. **Add EmailJS + Calendly secrets.** Repo → **Settings → Secrets and variables → Actions → New repository secret**. Add the same four values you have in your local `.env`:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_CALENDLY_URL`

4. **Lock down EmailJS to your domain (recommended).** EmailJS Dashboard → Account → Security → enable "Allow EmailJS to be used from these websites only" and add your GitHub Pages URL (`https://<your-username>.github.io`).

### After setup

Every `git push` to `main` triggers a rebuild. The site will be live at:

```
https://<your-username>.github.io/dayana-web/
```

The first deploy takes 1–2 minutes. Watch progress in the **Actions** tab of the repo.

### If you change the repo name

Update the `base` path in [vite.config.ts](vite.config.ts) to match: `base: "/<new-name>/"`.
