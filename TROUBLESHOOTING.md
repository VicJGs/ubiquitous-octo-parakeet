# UI Blankness & Build Warnings – Diagnosis and Fix Playbook

This repository uses Vite + React + HeroUI. When the built UI loads with missing content blocks (blank cards or invisible text) the most common root cause is:

**Undefined design tokens in `styles.css`** – Variables such as `--bg` and `--muted` were referenced but not defined, so backgrounds and muted text fell back to defaults. On dark themes this collapsed contrast and made cards and copy effectively invisible.

## Step-by-step remediation

1. **Define every referenced CSS variable**
   - Ensure `--bg` and `--muted` have values in both the light and dark theme sections of `src/styles.css` so layout and typography use consistent tokens instead of falling back to browser defaults.

2. **(If styling still looks off) Inspect global CSS imports**
   - HeroUI components bundle their own styles, but if you add optional global theme overrides, keep those imports above your app code in `src/main.tsx`.

3. **Verify locally**
   - Install dependencies if needed: `npm ci`
   - Run a development server and visually confirm sections populate: `npm run dev`
   - Production check for regressions: `npm run build`

## Expected outcome

After defining the missing tokens, the home page and other routes render their cards, stats, and tables with the intended contrast in both light and dark modes. The build still emits the upstream npm proxy and Vite CJS warnings (harmless for now), but the UI no longer appears blank.

## Remediation status (applied)

- All CSS tokens referenced by the UI are defined for both light and dark modes (`--text`, `--sidebar`, and `--shadow` were added to close the gaps). This prevents surfaces and shadows from collapsing to browser defaults, which previously made cards look invisible on dark mode.
- `react-icons` is installed so the icon components compile across the shell and page UIs without TypeScript module-resolution errors.
- The global stylesheet remains imported at the top of `src/main.tsx`, ensuring HeroUI theme variables and project tokens load before rendering any components.
