# SafeSpeak — Landing Page (Production Build v1)

Mobile-first, multilingual, trauma-informed landing page for SafeSpeak.
Rebuild of the previous text-heavy version, aligned to the Australian Government
Design System visual language and WCAG 2.2 AA.

## Stack

- **Next.js 14** (App Router, TypeScript, static export-friendly)
- **Tailwind CSS 3** — brand tokens live in `tailwind.config.ts`; swap the
  `active` palette (`harbour` | `sand` | `slate`) to re-theme the whole site
- **next/font** — Atkinson Hyperlegible (high legibility; Arabic/CJK fall back
  to system fonts with full glyph coverage)
- **Web Speech API** — free on-device ASR for voice input (no API keys);
  falls back to a demo capture where unsupported
- **Zero runtime dependencies** beyond React/Next

## Locales

`en`, `ar` (full RTL), `zh`, `vi` — copy decks in `src/i18n/locales/*.json`,
written to ~Grade 6 reading level. Add a language by adding one JSON file +
one line in `src/i18n/index.ts`. The middleware auto-detects from
Accept-Language and redirects `/` → `/<lang>`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /en
npm run build && npm start
```

## Deploy

Vercel-ready as-is. For the tender's data-residency requirement, deploy to
AWS Sydney or Azure Australia East (containerise with `next build` output or
use the standalone output). All assets are static; no PII touches this site.

## Images

All imagery in `public/images/` is AI-generated illustrative portraiture,
approved in design review. Caption copy on the page states this explicitly
("Images are illustrative portraits, not of real clients"). **Before tender
submission:** decide whether to keep illustrative portraits or commission the
half-day documentary shoot (shot list in the design brief). If replaced, drop
new files in with the same names — no code changes needed.

## Structure decisions (vs. previous site)

| Kept | Removed |
|---|---|
| Emergency 000 bar + interpreter line + Hide this page | Repeated slogans ("Your words. Your options.") |
| Trust line: "Free and independent — not police, not government" | Four "You stay in control" cards |
| Stories before How-it-works (user situation first) | "Important information" legal wall |
| 3-step cards, 3 reassurance promises | Duplicate disclaimer blocks |
| Sticky mic bar on scroll | AI explainer section (moved to product) |

Mandatory disclaimers still appear at consent/submission points inside the
product — the landing page carries only the one-line scope disclaimer.

## Roadmap (not in this build)

- `/api/understand` — RAG endpoint (FastAPI + pgvector, AU region) behind
  TryItBox; retrieval scoped by jurisdiction, every response cited +
  information-only disclaimer
- Consent modal, error/offline states (designed, awaiting product screens)
- `find support` section + About/Privacy/Terms pages
- Remaining 4 launch languages (Punjabi, Hindi, Nepali, Greek)
