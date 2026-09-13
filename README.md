# Kuchimoto Studio

Single-page site for [kuchimoto.com](https://kuchimoto.com) — independent
software engineering practice, Paris.

## What this is

One file: `index.html`. No build step, no framework, no dependencies, no
JavaScript, no webfont requests. ~16 KB uncompressed, a single HTTP request
for the whole page plus an inline SVG favicon.

That is deliberate rather than lazy. The page argues that the studio ships
platforms without plugin bloat or render-blocking third-party weight; a
portfolio that opened by pulling two font families off a CDN would be
arguing against itself. Fonts fall back through `Inter` → `Geist` →
`Helvetica Neue` → the platform UI face, all of which are tight neutral
grotesques already present on the target systems.

## Deploying

Static hosting, anywhere. On Vercel:

```
vercel --prod
```

No configuration needed — Vercel serves `index.html` at the root as-is.

## Editing

Everything lives in `index.html`. Two spots are marked with HTML comments
and are the ones that go stale:

- **Availability window** in the status bar. Written as an absolute range
  ("Q4 2026 – Q1 2027") rather than "this quarter", so an out-of-date line
  is visibly wrong instead of quietly wrong.
- **Booking link.** Currently a `mailto:` with a pre-filled subject and
  body. Swap both occurrences for a Calendly/Cal.com URL when one exists.

## The performance figures

The `Measured` row on each project card is real: median of three cold-cache
loads via headless Chromium against the live production sites, on
2026-09-13.

| Site | TTFB | FCP | load |
|---|---|---|---|
| ittsui.fr | 38 ms | 420 ms | 409 ms |
| amoraasia.com | 38 ms | 324 ms | 539 ms |

Re-measure before quoting them again — they are dated for a reason.
