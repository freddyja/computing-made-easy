# Computing Made Easy

Marketing site for **Computing Made Easy** / **Smart Touch Homes**. Freddy Jara-Almonte, retired United States Air Force. Central Florida IT, smart home, security, and a proposed practical-AI section.

This repository is **not** the live site. Production is WordPress on IONOS at [computingmadeeasy.org](https://computingmadeeasy.org). Nothing in this repo changes DNS, email, or hosting.

There is **no public demo**. Do not publish to GitHub Pages, Vercel, Netlify, or any other preview host. A later demo, if Freddy authorizes one, belongs on computingmadeeasy.org only.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Locales: English at the live paths, Spanish at `/es`, Brazilian Portuguese at `/pt-br`
- Contact form opens the visitor’s email app. It does not send mail by itself.

## Pages

| Public path | Spanish | Portuguese |
|-------------|---------|------------|
| `/` | `/es` | `/pt-br` |
| `/business-it` | `/es/business-it` | `/pt-br/business-it` |
| `/smart-home` | `/es/smart-home` | `/pt-br/smart-home` |
| `/security` | `/es/security` | `/pt-br/security` |
| `/contact` | `/es/contact` | `/pt-br/contact` |
| `/app-center` | `/es/app-center` | `/pt-br/app-center` |

`/en` redirects to the unprefixed English path. App Center links point at the real client apps. Those apps are not rebuilt here.

## Local development

```bash
npm install
npm run dev
```

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

## Docs

- `docs/Computing_Made_Easy_Content_Inventory_v1.md` — live-site inventory
- `docs/Computing_Made_Easy_Redesign_Review_Notes_v2.md` — review notes, including draft copy
- `docs/Computing_Made_Easy_Redesign_Review_Notes_v2_ES.md`
- `docs/Computing_Made_Easy_Redesign_Review_Notes_v2_PT-BR.md`
- `docs/Computing_Made_Easy_WordPress_to_Next_Migration_Plan_v1.md` — plan only, not executed

## Contact facts used on the site

407-925-2589 · freddy@computingmadeeasy.org · 1720 Alameda Dr, Spring Hill FL

The ZIP code is not on the live site and is not shown here.
