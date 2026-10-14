# KUCHIMOTO

Site of KUCHIMOTO SAS at [kuchimoto.com](https://kuchimoto.com): one French
company, three businesses (Happy Homes, BambooTails, Kuchimoto Lab).
French at the root, English under `/en`.

Next.js 16 (App Router), Tailwind CSS 4, deployed on Vercel.

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
| Company facts, contact, opening dates, Thailand prices | `src/config/site.ts` |
| Every word on the site (French, then English) | `src/i18n/dictionaries/fr.ts`, `en.ts` |
| Legal texts (mentions légales, CGV, confidentialité) | `src/i18n/legal/` |
| Pages | `src/app/[lang]/` |
| Forms and their emails | `src/app/api/contact`, `src/app/api/booking` |
| Card payment (Stripe Checkout) and its confirmation | `src/app/api/booking`, `src/app/api/stripe/webhook` |
| Cookie banner | `src/components/CookieBanner.tsx` |

Write French with ordinary spaces: the non-breaking spaces before `: ; ! ?`
are added automatically. Never use the em dash; `npm run lint` fails on one.

## To fill in before going live

- `src/config/site.ts`: `CONTACT.email`, `CONTACT.phone` (shown as
  `[e-mail]` and `[téléphone]` until then), `COMPANY.vatNumber`,
  `COMPANY.mediator`, and the registration once the RCS number exists.
- The CGV placeholders marked `[À COMPLÉTER : …]` in `src/i18n/legal/terms.tsx`.
- Photos: every `PhotoPlaceholder` (home of each division, About portrait).
- Environment variables: see `.env.example` (Resend for the forms, Stripe
  for card payments).
