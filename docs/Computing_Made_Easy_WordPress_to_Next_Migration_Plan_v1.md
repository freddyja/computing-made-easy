# Computing Made Easy — WordPress to Next migration plan v1

**Status: plan only. Nothing in this document has been executed.**

No DNS change, no email change, no hosting change, no WordPress change, no publish, no GitHub Pages, no Vercel/Netlify/Cloudflare attach, no domain purchase, and no preview deployment.

Live production on 6 November 2026 is **WordPress on IONOS**, not this repository. Apex `https://computingmadeeasy.org/` is canonical. `www` 301s to the apex. Mail stays on IONOS (`mx00` / `mx01.ionos.com`). The contact form in this redesign still opens a `mailto:` to `freddy@computingmadeeasy.org`. It does not need a new form host.

## What must survive cutover

1. Marketing paths: `/`, `/business-it`, `/smart-home`, `/security`, `/contact`, `/app-center`.
2. **Every App Center child path** already on the domain, including but not limited to:
   - `/anibal-handyman/`
   - `/organic-house-cleaning/`
   - `/russ-bogun-auto/`
   - `/gt-details/`
   - `/chairside/`
   - `/arcup-electrical/`
   - `/pedro-woodcraft/`
   - `/enclosed-trailer/`
   - `/paella-de-yoansy/`
   - `/frutas-de-yuniert/`
   - `/brazilian-acai/`
   - `/olas-ordering/`
   - `/hotdog-stop-demo/`
   - `/fire-and-fellowship/`
   - `/faithful-service-network/`
   - `/kingdom-sisters/`
   - `/fathers-charge/`
   - `/60-Seconds-in-the-Word-for-women/`
   - `/60-seconds-in-the-word/`
   - `/biblical-pharmacy/`
   - `/christian-food-pantry-intake/`
   - `/bible-verse-tracker/`
   - `/fruit-of-the-spirit/`
   - `/hannah-creations/`
   - `/doula-edu/`
   - `/life-church-tap/`
3. External App Center targets stay external. Do not copy them onto this domain as part of the marketing cutover:
   - `https://www.etsy.com/listing/4582102485/biblical-pharmacy-educational-herb`
   - `https://getgloballisting.com/Grokbot%20GGL/Get%20Global%20Listing/index.html`
   - `https://meeting-translator-captions.onrender.com/`
   - `https://fire-fellowship-captions.onrender.com/`
   - `https://360show.vercel.app/`
   - `https://party-requests-flax.vercel.app/r`
4. Apex HTTPS, and the existing `www` → apex 301.
5. IONOS mail (MX, SPF). Do not touch DNS records to “point the website” until a separate, explicit decision. Changing the A record can also break mail if it is done carelessly. This plan does not change the A record.
6. The directory `/app-center/` if anything outside the marketing page still depends on the current static hub. The Next page is a directory of the same links. It is not a replacement for the child app folders.

## What not to do

- Do not `rsync --delete` or otherwise replace the IONOS document root. The child apps are real directories beside WordPress. A full replace deletes them.
- Do not enable GitHub Pages. The project rule is no github.io demo.
- Do not connect the repository to Vercel, Netlify, Cloudflare Pages, or any host that publishes a preview URL on push.
- Do not install this Next app as a WordPress theme. It is a separate front end.
- Do not add a server-side form, CRM, or new mailbox. Mailto stays.
- Do not publish the Technophile / Hello World / spray-foam URLs as part of the new site. They are leftover WordPress demo content. Leave them on the current host until Freddy decides to noindex or redirect them. This repo returns 404 for those paths because they are not marketing pages.

## Recommended cutover, later, only with Freddy’s OK

1. Finish owner review of the draft copy listed in `Computing_Made_Easy_Redesign_Review_Notes_v2.md` (hero narrative, AI section, metadata, portrait likeness, logo).
2. Build the site (`npm run build`) on a machine Freddy controls. Do not deploy from that build yet.
3. Choose one hosting shape. Neither is set up now.
   - **Node on a host Freddy already pays for**, with this app behind the apex, and with the web server explicitly excluding the child-app directories from the Node app. The Next proxy in `proxy.ts` rewrites unprefixed English URLs to `/en/...` internally. Visitors still see `/`, `/business-it`, and the rest.
   - **Static files copied into a new folder that is not the live root**, then Apache/nginx aliases for only the six marketing routes. English pages today are generated under `/en` and exposed at the unprefixed paths by `proxy.ts`. A static host does not run that proxy. A later export would need those English files placed at the unprefixed paths, and the aliases must not shadow `/anibal-handyman/` or any other app directory. That export step is not in this repo on purpose, so it cannot be run by accident.
4. Keep WordPress and the child apps in place until the six marketing URLs are checked on a private copy. Then switch only those routes. Re-check every child path with a 200 after the switch. If any child path fails, roll the marketing routes back. Do not “fix” a child app by editing DNS.
5. Leave MX, SPF, and the mailbox `freddy@computingmadeeasy.org` on IONOS.
6. Leave the `www` 301 in place.
7. After cutover, confirm `tel:+14079252589` and `mailto:freddy@computingmadeeasy.org` still match the live business card, and that Smart Home prices are still ranges with the confirm-before-quoting line.

## Locale URLs to preserve in the new host

- English: `/`, `/business-it`, `/smart-home`, `/security`, `/contact`, `/app-center`
- Spanish: `/es`, `/es/business-it`, `/es/smart-home`, `/es/security`, `/es/contact`, `/es/app-center`
- Portuguese (Brazil): `/pt-br` and the same five suffixes
- `/en` and `/en/...` redirect to the English paths so they are not a second public copy

## Rollback

Keep the current WordPress theme and the current document root until the new routes have been checked. Rollback is “point the six marketing routes back at WordPress.” It is not a DNS restore, and it is not a deletion of app folders.

## Explicit non-actions in this pass

- No deploy
- No DNS edit
- No email edit
- No WordPress write
- No GBP work
- No purchase
- No public URL created for this redesign
