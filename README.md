# SOLARA — Premium Solar Energy Website

**SOLARA is a fictional Moroccan solar energy business and an Innovatechs concept demo.** This portfolio project is an interactive client-side website, not an operational solar installation service. No real installation, certification, review, quote, company address, or savings promise is represented.

## Stack

- React 19 + Vite 6 + JavaScript
- Tailwind CSS 3 (base/utilities) + custom responsive art-direction CSS
- Lucide React icons
- Framer Motion for scroll reveals, dialogs, cards, and chart transitions
- Native browser localStorage for inquiry CRUD
- No database, authentication, secret keys, or paid APIs

## Local development

Requirements: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

Open the URL printed by Vite (typically http://localhost:5173).

## Production build / preview

```bash
npm run build
npm run preview
```

Run self-contained calculator, validation, and local CRUD tests (no npm install required):

```bash
npm test
```

`dist/` is Vite's production output. To publish on Vercel, import the repository as a Vite project. Build command: `npm run build`; output directory: `dist`. `vercel.json` already includes configuration and an SPA fallback. No environment variables required.

## Key interactions

1. Responsive nav, mobile drawer, smooth section scrolling, back to top.
2. Savings calculator with controllable electricity bill, energy offset, and demo installation cost; animated results and six-year cumulative savings bar chart.
3. Filterable gallery with six **fictional concept** projects and detailed modal views.
4. Three-step inquiry form with field validation, on-page success state, and local save; no network transmission.
5. Inquiry dashboard (top navigation/footer) with empty state, list, deletion with confirmation, and JSON export. The data survives page reloads in the **same browser/device** only.
6. Expandable FAQ and graceful fallback if an image fails to load or localStorage is unavailable.

## Calculator methodology (educational only)

All amounts, sizes, and assumptions below are **fictional demo values**.

- **Monthly savings (MAD)** = current monthly bill × estimated offset (% / 100)
- **Annual savings (MAD)** = monthly savings × 12
- **Simple payback (years)** = assumed installation cost (MAD) / annual savings (MAD)
- **Cumulative chart** = annual savings × year number, for six years

Defaults in `src/data/site.js`:

```js
{
  installationCostMAD: 68000,
  billMAD: 1450,
  energyOffsetPercent: 70
}
```

The tool does **not** model solar generation from kWp, roof orientation, shading, maintenance, debt costs, tariff schedules, degradation, time-of-use, battery economics, grid export, VAT, incentives, or energy-price changes. No official Moroccan electricity prices or regulations are asserted. **It is not an engineering design, quote, ROI projection, or financial recommendation.** The cost is editable on-screen.

## Content and image licensing

Photography is loaded from the Unsplash image CDN (`images.unsplash.com`). Unsplash offers a license permitting use of its ordinary free images in commercial and noncommercial work: https://unsplash.com/license . Review Unsplash terms, individual source/license pages, and any depicted trademarks or identifiable people before use on a real client's live website. Images are **illustrative stock photography**, never representations of SOLARA's own work. Replace photographic sources with consented client photography for a real company.

Image URLs are centralized in `src/data/site.js`. The demo uses broadly distributed free Unsplash photography of architecture and solar panels. Images require an internet connection; if they do not load, an elegant fallback is displayed. Typefaces load from Google Fonts with locally available serif/sans-serif fallbacks.

## Source tree

```text
solara/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── vercel.json
├── public/
└── src/
    ├── main.jsx
    ├── App.jsx                 # sections and navigation
    ├── styles.css              # responsive art direction
    ├── lib.js                  # savings, validation, localStorage helpers
    ├── data/site.js            # sample data and configurable demo inputs
    └── components/
        ├── Shared.jsx          # images, dialogs, branding, reveal
        ├── Calculator.jsx
        ├── Gallery.jsx
        └── Inquiry.jsx         # quotation and local dashboard
```

## Limitations and production handoff

No submissions are sent to a server. LocalStorage is a **local showcase** of CRUD and is not an appropriate multiuser CRM or production lead capture system. For a real client, replace it with a secured server endpoint, spam prevention, privacy notice and retention controls, consent logging, and a legitimate follow-up workflow. Real installation costs, site-specific yield, and local regulatory requirements would need professional validation.

**Created as SOLARA — Innovatechs Portfolio Concept 01.**
