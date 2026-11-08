# Computing Made Easy redesign v5 — review notes

English only. The website remains English, Spanish, and Brazilian Portuguese. This file is a review and readiness note. It is not a cutover, and nothing in it was applied to computingmadeeasy.org.

Head: the commit on `feat/nextjs-redesign` that contains this file. Pull request: https://github.com/freddyja/computing-made-easy/pull/1

No deploy, merge, DNS change, email change, WordPress removal, or live mail send was performed.

## What changed

Air Force blue and gold now continue below the hero on the home page, Business IT, Smart Home, Security, Contact, and the standalone App Center, in all three locales.

- Header `#002B52`. Hero and main blue bands `#003B71`, with a deeper band `#062C52` for credentials, process, and the example-slide section.
- Ice section background `#E7EEF5` behind white cards. Gold `#D4AF37` is used for rules, buttons, and small labels on blue. Gold buttons keep ink text `#0B1F3A`.
- Small labels on white or ice use dark gold `#6B4F00`, which stays above a 4.5:1 contrast ratio on white, `#E7EEF5`, and `#FFF8E6`.
- Service accents are a left or top edge only: gold for credentials and AI, sky `#7EB6E0` for smart home and business IT cards, Old Glory red `#B22234` as a thin top edge on security cards. The flag SVG is unchanged: 50 stars, union blue `#3C3B6E`.
- App Center stays a separate directory. The header tab is still the only marketing-site link. Footer, home, service, and contact pages do not promote it.

The hero photograph was not regenerated. `public/brand/freddy-profile-hero.jpg` is still the 760×760 pixel window from `(620, 340)` to `(1380, 1100)` of `public/brand/freddy-profile-source.jpg` (1600×1201). The page shows that file at full width with no second `object-position` crop. Desktop and mobile hero screenshots were inspected: both sides of the hair, both ears, glasses, chin, and shoulders are in frame. His wife remains partly visible behind him on the left. Alt text still says it is a personal photograph, not a military portrait.

## Motion

Shared card treatment, no animation library.

| Behavior | Timing | Where |
| --- | --- | --- |
| Hover lift | 4px, 240ms ease, with shadow | Actual cards, and only for a fine pointer that can hover |
| Border / shadow | same 240ms transition | Same cards |
| Below-fold reveal | opacity and 12px translate, 520ms ease, once | Cards under the hero |
| Count-up | 900ms ease-out | “Since 2004” counts from 2000 to 2004. “2500+” counts from 0 to 2500 |

The hero, including the photograph, does not move or zoom. Static cards have no `tabindex` and no button role. Links and buttons keep a gold focus ring. Touch screens do not depend on hover.

`prefers-reduced-motion: reduce` removes transitions, animation, and the lift. The reveal class is not added, so nothing starts hidden. Count-up does not run. The published strings “Since 2004” and “2500+” are in the HTML. A production-browser check with reduced motion confirmed the motion class was absent, hidden cards were 0, transforms were `none`, and the visible figure was “Since 2004”.

Without JavaScript, or without `IntersectionObserver`, cards stay at opacity 1. `@media (scripting: none)` repeats that. With motion allowed, a production check found 18 below-fold cards hidden before scrolling and 0 hidden after scrolling to the bottom.

Screenshots do not show the motion. The checks above were run in headless Chrome against `next start`.

## Other additions

- Sticky header. On the home page, a second row links to Credentials, Services, Record, and Questions. Those links get `aria-current` from an intersection observer. Inner pages keep the existing current-page state. Section targets use an 8.75rem scroll margin so the sticky header does not cover them.
- Hero background is a blue gradient mesh behind the content. It does not sit on top of the photograph.
- FAQ accordion uses real service and contact facts: form delivery, the three smart-home ranges with the confirm-before-quoting line, no fixed business IT / security / AI price, the private-business disclaimer, and the Spring Hill address with “Since 2004”. Buttons use `aria-expanded` and `aria-controls`. A production click moved the second question from collapsed to expanded.
- Count-up uses only the published founding year 2004 and the published “2500+” client figure. It does not invent a count of years.
- Example slider: manual Previous / Next only, no autoplay. Every locale says these slides are not customer reviews. The live site still has no verified testimonials. Real quotes are needed before this section can show customers. A production click moved the slide from “Example 1 of 3” to “Example 2 of 3”.

## Contact form

There is no existing mail provider in this repo. The form now posts JSON to `/contact-submit.php`.

- Success text (“Freddy received your message.”) renders only when the response is `{ "ok": true, "delivered": true }`.
- Empty required fields show the existing validation errors and do not submit. A production click on an empty form showed “Check the highlighted fields.”
- A filled production submit, against `next start`, showed “The message could not be sent. Nothing was sent.” plus the email and phone fallback. `next start` does not execute PHP, and the POST returned HTTP 500 with the PHP source rather than JSON. Nothing was sent. This was not a delivery test.
- On Apache, the same file returns HTTP 503 `{ "ok": false, "code": "unconfigured" }` until SMTP settings exist. The form then says “This website cannot send the message yet. Nothing was sent.”
- The email link still opens the visitor’s mail app. That link is not a success state. The note says the message is not sent until the visitor sends it.
- Honeypot field `company_website`. Server validation, a 5-submission / 10-minute limit per IP, and newline stripping are in the PHP. Unit tests cover the success, unconfigured, and honeypot branches with a mock transport. Those tests do not prove live delivery.

SMTP settings are read from `CME_SMTP_HOST`, `CME_SMTP_PORT`, `CME_SMTP_USER`, `CME_SMTP_PASSWORD`, `CME_SMTP_FROM`, `CME_SMTP_TO`, and `CME_SMTP_ENCRYPTION` (`starttls` or `ssl`), or from a PHP file outside the web root named by `CME_MAIL_CONFIG` (default `../private/cme-mail.php` when the script sits in the document root). `deploy/cme-mail.example.php` has empty credentials on purpose. No password is in git. A real send still needs a separate approval and a filled-in server config.

## Hosting options

Live site, from the read-only check supplied for this pass: IONOS Apache, PHP 8.3.36, WordPress. No Vercel project. Cloudflare has no zone. IONOS Deploy Now can run Node at build time. It does not keep a Node server running. Moving the apex is not required.

### Option A — static export plus PHP (fits the current host)

`npm run export` sets `CME_STATIC_EXPORT=1` and runs `next build` with `output: "export"`, `trailingSlash: true`, and unoptimized images. That command completed in this workspace. HTML is written to:

- `out/en/index.html`, `out/en/business-it/index.html`, `out/en/smart-home/index.html`, `out/en/security/index.html`, `out/en/contact/index.html`, `out/en/app-center/index.html`
- the same six pages under `out/es/` and `out/pt-br/`
- `out/contact-submit.php`, `out/_next/`, `out/brand/`

`output: "export"` turns off `proxy.ts`. Apache has to do that job. `deploy/apache-marketing.example.conf` is an example, not an enabled vhost:

1. Redirect `/en` and `/en/...` to the unprefixed English paths with a temporary 302, so a rollback is not cached as a permanent redirect.
2. Serve `/` from `/cme-static/en/index.html`. The document root is itself a directory, so this rule has to come before the “real directory” rule or WordPress keeps the home page.
3. Leave real files and directories alone. That is what keeps the 26 child-app trees, WordPress, `/_next`, `/brand`, and `contact-submit.php` in place.
4. Rewrite only `business-it`, `smart-home`, `security`, `contact`, and `app-center` to `/cme-static/en/...`.
5. Rewrite `/es` and `/pt-br` to the matching export folders.

Copy `out/en`, `out/es`, and `out/pt-br` into `DOCUMENT_ROOT/cme-static/`, and copy `out/_next`, `out/brand`, and `out/contact-submit.php` to the document root. Do not `rsync --delete` the document root. Do not delete WordPress until the marketing URLs and all 26 app URLs have been checked. Rollback is commenting out that rewrite block. WordPress `index.php` serves the home page again. MX, SPF, the mailbox, and the existing `www` → apex 301 stay as they are.

`/anibal-handyman/` and the other 25 app paths are not in the rewrite list. `lib/preserved-apps.ts` also tells the Next proxy to skip those trees, including subpaths, if a request ever reaches Next. On this production server those paths 404, which is expected: the apps are not in this repo. They must keep being served by Apache from their current directories. A Next process must not be the only front controller for the vhost.

Node is not required for this option. The pages are static files. Mail is PHP.

### Option B — `next start` (needs a long-running Node process)

`npx next build` then `npx next start` is what was used for the local checks. `proxy.ts` rewrites unprefixed English URLs to `/en/...` and redirects `/en/contact` to `/contact` (HTTP 307 in the local check). This host does not execute `contact-submit.php`, so the form cannot deliver mail here.

IONOS Deploy Now does not provide this runtime. A Node host would still need the web server to send the 26 app directories (and WordPress, until it is retired) somewhere other than the Node process. There is no reason to move the apex to get that.

### Blockers before any cutover

- The parent is still checking the IONOS contract, whether custom Apache rewrites are allowed, whether authenticated SMTP is allowed, and whether a backup exists. No change was made from here.
- SMTP is not configured. The form will not report success until it is, and a real delivery test needs a separate approval.
- Verified testimonials do not exist. The slider is labeled as design-review examples.
- `?interest=` is read in the browser, so the static pages can still preselect Smart Home, Business IT, Security, or AI.
- The document element starts as `lang="en"`. Each page wraps its content in the right language, and a small script updates the document element after load. With JavaScript off, the document element stays `en`. That is not a reason to require Node.
- getgloballisting.com is only an external App Center link. It was not changed.
- No paid signup, no Vercel project, no Cloudflare zone, no DNS edit.

## Checks run

- `npx vitest run` — 19 passed (13 preservation, 6 v5 behavior)
- `npx tsc --noEmit` — passed
- `npx eslint .` — no errors
- `npx next build` — passed
- `npm run export` (`CME_STATIC_EXPORT=1 next build`) — passed, with the expected notice that static export disables middleware
- Headless Chrome against `next start` on port 3470: empty-form validation, filled-form non-success, FAQ toggle, slider step, reduced-motion figures, and reveal-after-scroll
- Desktop, mobile, and tablet home screenshots, plus Business IT, Smart Home, Security, Contact, App Center, and Spanish and Portuguese home screenshots, were written under `/opt/cursor/artifacts/`. The desktop and mobile hero crops were looked at. The face is inside the frame on both.

Package: `Computing_Made_Easy_Redesign_v5.zip`. It excludes `.git`, `node_modules`, `.next`, `out`, and env files.
