# AI-Powered Research UI (Vite + React + TypeScript)

A prototype UI for the AI-powered research system using HeroUI components, React Router, and Vite.

## Prerequisites
- Node.js 18+ and npm
- Git (to clone the repository)

## Getting Started
1. **Install dependencies** (run from the repository root, where `package.json` lives):
   ```bash
   npm install
   ```
2. **Start the dev server**:
   ```bash
   npm run dev
   ```
   Vite will print a URL (typically `http://localhost:5173`).

3. **Production build & preview** (optional):
   ```bash
   npm run build
   npm run preview
   ```

## Troubleshooting
- `npm ERR! enoent Could not read package.json`: This means the command was run from the wrong directory. Ensure your terminal is in the repo root (e.g., `~/ubiquitous-octo-parakeet`) and that `package.json` is visible when you run `ls`.
- `vite: command not found` even after `npm install`:
  1) Confirm you are running commands from the repo root.
  2) Verify Node 18+ is installed (`node -v`). If not, install via [nvm](https://github.com/nvm-sh/nvm) or https://nodejs.org and restart your terminal.
  3) Remove any accidental global `node` package installs that ship their own binary: `npm uninstall node`.
  4) Reinstall clean dependencies: `rm -rf node_modules` then `npm install`.
  5) Retry: `npm run dev`.
- macOS `dyld: Symbol not found ... node_modules/node/bin/node`: This happens when the `node` npm package adds an incompatible Node binary. Run `npm uninstall node`, delete `node_modules`, and reinstall dependencies with a proper system Node 18+.
- If dependencies still fail to install, update Node to the latest LTS and retry `npm install`.

## Project Structure
- `src/` – React pages and shared components (app shell, dashboard, workspaces, tasks, workflows, knowledge, profile/settings)
- `src/data/mockData.ts` – Mock data powering the demo screens
- `src/styles.css` – Global styles
- `MERGE_GUIDE.md` – Steps for reconciling the PR with `main`

## Notes
- The UI uses [HeroUI](https://www.heroui.com/) components; see their docs for styling and theming options.
