# KUCHIMOTO

The showcase site of Kuchimoto LLC at [kuchimoto.com](https://www.kuchimoto.com):
custom websites, web applications and AI systems, and the seven live
platforms that prove them. English only.

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, three.js through
@react-three/fiber, Lenis, Zod. No Framer Motion and no GSAP: motion is CSS
and small hooks. Deployed on Vercel.

## Run it

```
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint     # ESLint, then a check that no em dash is used anywhere
```

## Where things are

| What | Where |
|---|---|
| Company facts, prices, engagement tracks, process | `src/data/site.ts` |
| The seven projects and their case studies | `src/data/projects.ts` |
| Pages | `src/app/` (`/`, `/work`, `/work/[slug]`, `/studio`, `/lab`, `/contact`, `/legal`) |
| Home sections | `src/components/home/` |
| 3D hero Kigumi sculpture (hold to open the joinery), the Lab's monolith, the coastal mist shader | `src/components/webgl/` |
| Sound (Web Audio, no audio files) | `src/components/audio/` |
| Header, menu, footer, preloader, sumi route curtain, smooth scroll | `src/components/layout/` |
| Scope inquiry form and its API | `src/components/contact/InquiryForm.tsx`, `src/app/api/inquire/route.ts` |
| Stripe webhook (kept for the account's checkout events) | `src/app/api/stripe/webhook/route.ts` |
| Old French/English/Japanese addresses | redirects in `next.config.ts` |

## Assets

Drop a new file at the same path to replace an asset:

- Project images: `public/images/projects/<slug>.jpg` (about 1600 px wide).
- Studio images: `public/images/studio/`. `kigumi-poster.jpg` (wide) and
  `kigumi-poster-tall.jpg` (phones) are stills of the live hero scene:
  phones keep the still, desktops fade the live scene in over it.
  `monolith-poster*.jpg` do the same for the Lab's monolith.
- Videos: `public/videos/<name>.mp4` and `.webm`, each with `<name>-poster.jpg`.
  `kuchimoto-horizon-reel` is the muted 12-second loop (crossfaded);
  `kuchimoto-studio-reel.mp4` (joinery, orbital ring, ripples) plays with
  sound when PLAY REEL is clicked.
- The ink film: `public/videos/kuchimoto-inoue-ink.mp4` and `.webm` (brush
  stroke and vermilion seal, looped), with `kuchimoto-inoue-ink-poster.jpg`
  as its first frame. Replace the three files to change the film.
- Link previews (Facebook, LinkedIn, X): `public/og/kuchimoto-kigumi.jpg`
  and `public/og/<slug>.jpg`, 1200 × 630. Rename the file when the image
  changes: Facebook caches previews by image address.

## Leads

The form saves every inquiry in the `leads` table of the Neon database
(`DATABASE_URL`) before any email, then emails it to `CONTACT_TO_EMAIL`
through Resend and sends the visitor a reply from samuel@kuchimoto.com.

Share links with a `ref` to know who brought a lead, for example
`https://www.kuchimoto.com/?ref=anna`. The ref, UTM tags and referrer are
stored with the lead (columns `ref`, `utm_*`, `referrer`, `landing_page`)
and shown in the notification email.

## Performance rules

- The hero paints a still first. three.js is imported on desktops only
  (fine pointer, 1024 px and wider), on the first move, scroll or key or
  after 2.5 s. Phones never download it, nor Lenis.
- Both fonts are preloaded: a font found late in the stylesheet holds the
  first paint on a phone.
- The dark band's mist is one fragment shader in plain WebGL (no three.js).
- Every WebGL canvas stops rendering when off screen.
- Videos load only near the screen and play only while visible.
- Reduced motion: no preloader, no smooth scroll, stills instead of 3D.
