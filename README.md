# Mediatech Festival 2026 Web App

This is a static Vite + React web app for the Mediatech Festival 2026 schedule, speakers, favorites, and badge views.

## Run locally

Prerequisite: Node.js 20+.

1. Install dependencies with `npm install`.
2. Start the dev server with `npm run dev`.
3. Build for production with `npm run build`.

No API key is required anymore. If you still have an old `.env.local`, it is unused.

## GitHub Pages

This project is set up to deploy to GitHub Pages from GitHub Actions.

1. Push this project to a GitHub repository.
2. If your default branch is not `main`, update `.github/workflows/deploy.yml`.
3. In GitHub, open `Settings` -> `Pages` and set the source to `GitHub Actions`.
4. Push to `main`. The workflow will build the app and publish `dist` to GitHub Pages.

Notes:

- Project pages such as `https://github.com/your-org/your-repo` are handled automatically with the correct Vite base path.
- User or organization pages such as `your-name.github.io` are also handled automatically.
