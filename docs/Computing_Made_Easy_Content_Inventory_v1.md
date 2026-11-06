# Computing Made Easy — Content Inventory v1

**Date:** 2026-11-06 (America/New_York)  
**Scope:** Read-only discovery of live public site + narrow GitHub remote lookup. No clone, no DNS/hosting changes, no publish, no GBP work.  
**Intended rebuild:** Next.js + TypeScript + Tailwind; deliverables EN / ES / PT-BR. Public demo only on computingmadeeasy.org (never github.io).

---

## 1. Verified repository & hosting

| Item | Finding |
|------|---------|
| **GitHub repo (verified)** | https://github.com/freddyja/computing-made-easy |
| **Owner** | `freddyja` |
| **Visibility** | Public |
| **Default branch** | `main` |
| **Description** | “Computing Made Easy / Smart Touch Homes marketing site (Next.js)” |
| **Repo state** | Scaffold only. README: “Scaffold coming via Cursor cloud agent.” Single initial commit 2026-09-27; `homepage` null; GitHub Pages **off**; language null. |
| **Open PR** | PR #1 open, mergeable: https://github.com/freddyja/computing-made-easy/pull/1 — branch `feat/nextjs-redesign` → `main`. Title: “feat: Next.js marketing site redesign (navy/electric hub)”. Body (metadata only): App Router + TS + Tailwind; pages `/`, `/smart-home`, `/business-it`, `/security`, `/contact`; mailto contact; navy/electric tokens; **explicitly do not attach domain/DNS yet**. +8073/−2 across 31 files. Code not reviewed here — cloud agent owns implementation. |
| **Live production host** | **WordPress on IONOS**, not the GitHub repo and not Vercel/Netlify/github.io. |
| **Evidence** | Apache + PHP/8.3.36; `x-ws-origin` IONOS webspace headers; robots.txt Disallow `*/cache/ionos-performance/`; A `74.208.236.107`; NS `ns1105.ui-dns.*`; MX `mx00/mx01.ionos.com`; SPF `include:_spf-us.ionos.com`. |
| **Active theme** | Custom WP theme **Computing Made Easy** v1.0.0 at `/wp-content/themes/computing-made-easy/` (navy `#0B1F3A` / electric `#2563EB`). Elementor + Essential Addons still loaded on pages but primary marketing chrome is the custom theme. |
| **www** | `www` → same A (`74.208.236.107`); apex preferred. `https://www…` **301** → `https://computingmadeeasy.org/` (WordPress). |

**Coding handoff pointer:** implement Next.js redesign in `freddyja/computing-made-easy` (PR #1 / cloud agent). Deploy target for public demo remains **computingmadeeasy.org** (IONOS today). Do **not** use github.io.

---

## 2. Source / canonical URLs (live)

### Primary marketing (preserve)

| URL | Role | Lastmod (sitemap) |
|-----|------|-------------------|
| https://computingmadeeasy.org/ | Home (canonical) | 2026-09-27 |
| https://computingmadeeasy.org/business-it | Business IT | 2026-09-27 |
| https://computingmadeeasy.org/smart-home | Smart Home / Smart Touch Homes packages | 2026-09-27 |
| https://computingmadeeasy.org/security | Security | 2026-09-27 |
| https://computingmadeeasy.org/contact | Contact + form | 2026-09-27 |
| https://computingmadeeasy.org/app-center | Freddy's App Central (static HTML hub) | 2026-10-03 |

### SEO / crawl

- Canonical home: `https://computingmadeeasy.org/`
- robots.txt: https://computingmadeeasy.org/robots.txt (WP defaults + IONOS cache disallow)
- Sitemap index: https://computingmadeeasy.org/wp-sitemap.xml (= sitemap.xml)
- Page sitemap: https://computingmadeeasy.org/wp-sitemap-posts-page-1.xml
- Post sitemap: https://computingmadeeasy.org/wp-sitemap-posts-post-1.xml

### Leftover / template URLs still **200** (do not treat as brand content)

Technophile / WP demo residue still indexed in sitemap — **flag as placeholder / cleanup candidates** (noindex or remove on rebuild; preserve redirects if any public links exist):

- `/sample-page`, `/home-page`, `/contact-page`, `/service-page`
- `/technophile-blog-page`, `/technophile-about-page`, `/technophile-portfolio-page`, `/technophile-portfolio-detail-page`, `/technophile-pricing-page`, `/technophile-clients-page`
- Blog demos: `/hello-world`, art/character/underground-homes/web-design/used-technology posts, `/cost-of-a-spray-foam-roofing-system-*`
- Category: `/category/uncategorized`

### App Center child apps (hosted on same domain — preserve links)

Many client apps live as paths under computingmadeeasy.org (standing rule: App Center stays on this domain; no github.io). Examples from live App Center HTML:

`/anibal-handyman/`, `/organic-house-cleaning/`, `/russ-bogun-auto/`, `/gt-details/`, `/chairside/`, `/arcup-electrical/`, `/pedro-woodcraft/`, `/enclosed-trailer/`, `/paella-de-yoansy/`, `/frutas-de-yuniert/`, `/brazilian-acai/`, `/olas-ordering/`, `/hotdog-stop-demo/`, `/fire-and-fellowship/`, `/faithful-service-network/`, `/kingdom-sisters/`, `/fathers-charge/`, `/60-Seconds-in-the-Word-for-women/`, `/60-seconds-in-the-word/`, `/biblical-pharmacy/`, `/christian-food-pantry-intake/`, `/bible-verse-tracker/` (Fruit of the Spirit / Living Word paths also present), `/hannah-creations/`, `/doula-edu/`, `/life-church-tap/`, plus others listed on App Center.

**External App Center targets (preserve as-is):**

- https://360show.vercel.app/
- https://fire-fellowship-captions.onrender.com/
- https://meeting-translator-captions.onrender.com/
- https://party-requests-flax.vercel.app/r
- https://getgloballisting.com/Grokbot%20GGL/Get%20Global%20Listing/index.html
- https://www.etsy.com/listing/4582102485/biblical-pharmacy-educational-herb

---

## 3. Navigation (live primary)

**Header / mobile:** Home (logo) · Contact · Security · Business IT · Smart Home · App Center · CTA “Free quote” → `/contact` · tel CTA “Call 407-925-2589”

**Footer Explore:** Home · Business IT · Smart Home · Security · Contact

**Languages:** HTML `lang="en"` only. No hreflang. **ES / PT-BR not on live site yet** — required for redesign deliverables; flag all non-EN copy as to-be-translated (do not invent final brand text beyond translating approved EN).

**Social:** No Facebook / Instagram / LinkedIn / YouTube links found on primary pages. (Known Facebook Page from durable context is **not** linked on the live site — do not add without OK.)

---

## 4. Contact & business facts (verified from live source)

| Field | Live source value | Notes |
|-------|-------------------|-------|
| Phone | **407-925-2589** (`tel:+14079252589`) | Verified on home, service, contact pages |
| Email | **freddy@computingmadeeasy.org** | mailto + form fallback |
| Address | **1720 Alameda Dr, Spring Hill FL** | Live site **omits ZIP**. Profile memory has 34609 — **unverified on site; do not invent on redesign until confirmed** |
| Owner | Freddy Jara-Almonte (Retired USAF) | Contact + Business IT |
| Co-lead (Smart Home) | Nathan JaraAlmonte | Smart Home page |
| Brand line | Computing Made Easy · Smart Touch Homes | Logo subline / footer |
| Since | **Since 2004** | Everywhere on primary pages (standing rule) |
| Proof points | Veteran-owned · 2500+ / ~2500 clients · Spring Hill / Brooksville / Central Florida | Preserve; do not inflate |
| Hours | **Not published** on these primary pages | |

---

## 5. Page copy summary (preserve meaning)

### Home `/`
- H1: “IT and smart homes that just work”
- Sub: Veteran-owned support for businesses and homes across Spring Hill, Brooksville, and Central Florida. Since 2004.
- Services cards → Business IT / Smart Home / Security
- Strip: Veteran-owned • Since 2004 • 2500+ clients • Spring Hill / Brooksville
- CTA: Talk with Freddy Jara-Almonte — local, veteran-owned help for IT, smart homes, and security.

### Business IT `/business-it`
- H1: “IT that keeps your business moving”
- Blocks: Managed IT & support; Networks & Wi-Fi; Cloud & backup; Repair & on-site
- 3-step process; note that pricing is scoped after discovery (no fixed packages listed)
- Local expert blurb with ~2500 clients since 2004

### Smart Home `/smart-home`
- H1: “Make your home smarter” — Simple setup / Secure / Efficient
- Alexa ecosystem + Florida weatherproof installs; co-led with Nathan JaraAlmonte
- **Packages (preserve ranges; site itself says confirm before quoting):**
  - Basic $1,500–$2,000 — Ring doorbell, Echo Dot, Philips Hue starter, eero Wi-Fi
  - Standard $2,500–$3,500 — Ring + 2 cameras, Echo Show 8, expanded Hue, eero 6+, sensors
  - Premium $4,000–$5,500 — 4 cameras, Echo Show 10, whole-home Hue, eero Pro 6E, locks & thermostats
- Why-us: Veteran-owned, Expert install, Simple tech, Save money

### Security `/security`
- H1: “Protection you can count on”
- Cameras & doorbells; Sensors & alerts; Network security; Whole-home peace of mind
- Explicitly **no invented price list**; pairs with Smart Touch Homes

### Contact `/contact`
- H1: “Let's make tech easy”
- Phone / email / address blocks; owner line; same-day response note

### App Center `/app-center`
- Standalone static page (“Freddy's App Central”), not WP theme chrome
- Tagline: “Every client deserves a home online.”
- Categories: Home & Trade (8), Food & Beverages (5), Faith & Community (11), Creative (2), Business (1), Tools & Technology (5)
- **Must remain on computingmadeeasy.org**; update in same pass when apps change (standing rule)

---

## 6. Functional forms

**Contact form** `#cme-contact-form` on `/contact` only:

| Field | Name | Required |
|-------|------|----------|
| Name | `name` | yes |
| Email | `email` | yes |
| Phone | `phone` | no |
| Service interest | `interest` select | Business IT / Smart Home (default) / Security / General question |
| Message | `message` | yes |

**Behavior:** Client-side only — `theme.js` builds a `mailto:freddy@computingmadeeasy.org` with subject `Website inquiry — {interest} — {name}` and body fields. Status text: “Opening your email app…”. **No server POST, no CRM, no paid form plugin.** Preserve equivalent UX (or improve only with explicit OK).

No other forms on primary marketing pages.

---

## 7. Assets

### Live site (sparse imagery on primary theme pages)

- Site icons only under WP uploads (military metal-art / US flag Air Force logo derivatives), e.g.  
  `https://computingmadeeasy.org/wp-content/uploads/2025/01/cropped-military-metal-art-front-view-us-flag-with-air-force-logo-600x444_processed-{32x32,192x192,180x180}.png`
- Theme CSS/JS: `/wp-content/themes/computing-made-easy/style.css`, `.../js/theme.js`
- App Center fonts: Google Fonts Fraunces + DM Sans
- Primary marketing pages are largely **typography/layout, few content images**

### Durable local brand files (box `/workspace`, for redesign use — not secrets)

- `/workspace/Computing_Made_Easy_Logo_v1.jpg`
- `/workspace/Computing_Made_Easy_Cover_v1.jpg`
- `/workspace/cme-web-portrait.jpg`, `/workspace/cme-web-portrait-v2.jpg`
- Theme package: `/workspace/cme-wp-theme/computing-made-easy.zip`
- Prior Next-shaped folder on box (no `.git`; **not** a substitute for the GitHub remote): `/workspace/computing-made-easy/`
- App Center helpers: `/workspace/appcenter-links.txt`, `/workspace/cme-app-host/`, `/workspace/cme-more-apps/`

**Placeholder flag:** Live favicon/set appears to be military metal-art stock, **not** the newer `Computing_Made_Easy_Logo_v1.jpg`. Confirm which logo ships before publish.

---

## 8. SEO / redirect considerations for redesign

- Prefer apex HTTPS; keep `www` → apex 301.
- Preserve paths: `/`, `/business-it`, `/smart-home`, `/security`, `/contact`, `/app-center` (and `/app-center/`).
- Preserve App Center child paths and external app URLs.
- Plan noindex/removal for Technophile + Hello World + spray-foam demo posts (currently 200 + in sitemap) — **blocker for clean SEO** until decided.
- Meta descriptions: mostly **missing** on primary theme pages; App Center has one. Add real meta on rebuild (flag invented blurbs).
- No EN/ES/PT hreflang yet — add when locales ship.
- Contact is mailto-based — SEO/UX fine, but leads depend on user mail client.

---

## 9. Design tokens observed (live theme)

- Navy `#0B1F3A`, electric `#2563EB`, soft `#DBEAFE`, muted `#64748B`, surface `#F8FAFC`
- System font stack; radius ~1rem; max width ~72rem  
App Center uses a separate warm palette (accent `#C05A08`, Fraunces/DM Sans) — decide whether hub stays visually distinct.

---

## 10. Unresolved blockers / decisions for parent / cloud agent

1. **Production ≠ GitHub repo.** Live is IONOS WordPress theme; GitHub is empty Next scaffold + open PR #1. Cloud agent must build in repo **and** a separate cutover plan to computingmadeeasy.org is required (Freddy OK before any DNS/hosting/publish).
2. **ZIP code** not on live pages; confirm 34609 before putting on redesign.
3. **Logo choice:** WP military favicon vs local `Computing_Made_Easy_Logo_v1.jpg` / cover / portraits — needs brand OK.
4. **Leftover Technophile/demo URLs** still public and sitemapped — cleanup vs redirects.
5. **i18n:** ES / PT-BR required for deliverables but absent live — translate approved EN only; flag placeholders.
6. **Facebook Page** known in memory but not linked on site — do not add without OK.
7. **Smart Home prices** are ranges with “confirm before quoting” — preserve disclaimer; do not harden as fixed quotes.
8. **App Center** must stay on-domain; many child apps + some Vercel/Render/Etsy/GGL externals — redesign must not break `/app-center` or child paths.
9. **No publish / DNS / GBP / paid hosting** in this phase — inventory only.
10. **PR #1** exists for the Next redesign — parent should launch cloud agent against `freddyja/computing-made-easy` using this inventory; do not assume PR contents without agent review.

---

## 11. What to preserve (checklist)

- [ ] Brand name + Smart Touch Homes sub-brand  
- [ ] Since 2004 + veteran-owned + ~2500 clients  
- [ ] Phone 407-925-2589, email freddy@computingmadeeasy.org, address line (ZIP TBD)  
- [ ] Service triad: Business IT / Smart Home / Security copy & IA  
- [ ] Smart Home package tiers + price ranges + disclaimer  
- [ ] Contact form fields + mailto behavior (or approved upgrade)  
- [ ] App Center + all on-domain app paths + listed external links  
- [ ] Apex URL + www redirect behavior  
- [ ] Navy/electric identity (unless brand refresh approved)

## 12. Placeholder / do-not-invent flags

- Technophile theme demo pages & stock blog posts  
- Missing meta descriptions  
- Missing ZIP on address  
- Missing social links  
- Missing hours on site  
- ES / PT-BR strings until translated from approved EN  
- Any new taglines, testimonials, or stats beyond live “2500+ / ~2500”

---

*End inventory v1. Parent: deliver this file to Drive `Site Creator - Files` (1OksLQMMqHyno4zEG076KWfPZuqYh0Pvb), Central Hub, Docu Cabinet, and FreddyWorkPC copy per user request this turn.*
