# Chinmay Kashyap — Portfolio

Personal engineering portfolio for **Chinmay Kashyap** (`Machine Learning Engineer · Cloud & Backend Software Engineer (AWS & GCP)`, B.Tech in Computer & Communication Engineering at Manipal University Jaipur, `Aug 2024 – Jul 2028`).

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and a custom **WebGL fluted-glass shader**, configured for static export (`output: 'export'`) to **GitHub Pages**.

---

## Architecture Overview

1. **WebGL Fluted-Glass & Data Filament Canvas (`src/components/FlutedGlassCanvas.tsx`)**
   - Custom GLSL fragment shader rendering vertical optical-glass flutes, cursor refraction, scroll parallax, and sparse data pulses.
   - Automatically renders a single static frame on constrained mobile devices (`pointer: coarse` with low core count) or when `prefers-reduced-motion: reduce` is enabled.
   - Includes a pure-CSS fallback (`fluted-css-fallback`) if WebGL is unavailable.
2. **Selected Work & Flagship Case Study (`src/components/SelectedWorkSection.tsx` & `src/components/RiskCaseStudyModal.tsx`)**
   - **Primary Flagship Projects** (in exact curated order):
     1. **CompanyQ** — Live browser-based OA preparation platform covering 132 companies and 65 problems across 7 formats.
     2. **D.O.O.M** — Full-stack maritime cargo-manifest forensics platform (`1.0000` F1 across 12 batch tampering families, `87.5%` field repair coverage, `9.22 ms p50` stream latency).
     3. **FinSight Risk Engine** — Corporate bankruptcy prediction pipeline across `6,819` companies and `95` financial ratios (`0.950` ROC-AUC, `77%` recall with Random Forest + SMOTE, SHAP waterfall explanations).
   - **Secondary Projects**: `Financial Risk Intelligence System`, `Vertex AI Financial Analyst Assistant`, and `GKE CI/CD Automation Pipeline`.
   - **7-Stage Case Study (`#case-study`)**: Covers `Problem → Data → Feature Engineering → Model → Explainability → Evaluation → Result`, plus an interactive 5-feature Random Forest risk simulator modal.
3. **Static-First Live Telemetry (`src/components/LiveStatsSection.tsx` & `scripts/fetch-stats.mjs`)**
   - Scheduled GitHub Action (`.github/workflows/update-stats.yml`) runs every 6 hours and on manual dispatch (`workflow_dispatch`) to fetch:
     - **LeetCode GraphQL (`chinmayykashyap`)**: total solved, Easy/Medium/Hard breakdown, acceptance rate, and submission calendar.
     - **HackerRank REST (`wrkchinmay`)**: domain badges and solved challenges, with fallback to [`data/manual-stats.json`](./data/manual-stats.json).
     - **GitHub REST (`Chinmayykashyap-git`)**: public repository count and language distribution.
4. **Centralized Typed Content (`content/portfolio.ts`)**
   - All profile metadata, experience entries, project descriptions, case study stages, research/patent records, skills, and credentials are stored in [`content/portfolio.ts`](./content/portfolio.ts).

---

## Local Development

### Prerequisites
- **Node.js 18.18+** (Node 20 LTS recommended)
- **npm**

### 1. Install dependencies
```bash
npm install
```

### 2. Start the local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 3. Refresh coding telemetry or regenerate the PDF résumé
```bash
# Fetch latest LeetCode, HackerRank, and GitHub stats into public/data/stats.json
npm run update-stats

# Regenerate public/Chinmay_Kashyap_Resume.pdf
npm run generate-resume
```

### 4. Build static export (`./out`)
```bash
npm run build
```

---

## Deploying to GitHub Pages

1. Push this repository to GitHub on the `main` branch.
2. In your GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. `.github/workflows/deploy.yml` will build the static export (`./out`) and deploy it to GitHub Pages automatically on every push to `main`.

---

## Updating Content & Manual Stats Override

- **Edit portfolio content**: Update [`content/portfolio.ts`](./content/portfolio.ts).
- **Override HackerRank or LeetCode stats in 30 seconds**: Edit [`data/manual-stats.json`](./data/manual-stats.json), set `"useManualOverride": true` on the section you want to override, and run `npm run update-stats` (or push to `main`).
