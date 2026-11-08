# Computing Made Easy redesign v5 — review notes

English only. The website remains English, Spanish, and Brazilian Portuguese. This file is a review and readiness note. It is not a cutover, and nothing in it was applied to computingmadeeasy.org.

Do not use `4227e42`, `df8f714`, `900ccae`, `2b2ecf8`, or `26dd080` as the source of this package. Those commits are earlier. This revision is the commit on `feat/nextjs-redesign` that maps the Next prefetch files before the first WordPress catch-all. The form recipient remains `contactus@computingmadeeasy.org`. App Center stays off the site menu. Pull request: https://github.com/freddyja/computing-made-easy/pull/1

## Prefetch 404s

Live proof on 8 Nov 2026: `GET /__next._tree.txt` and `GET /business-it/__next._tree.txt` return HTTP 404, `content-type: text/html`, `x-powered-by: PHP/8.3.36`, and a WordPress “Page not found” document. The same files already exist and return HTTP 200 `text/plain` at `/cme-static/en/__next._tree.txt` and `/cme-static/en/business-it/__next._tree.txt`. The body begins with the Next flight payload (`:HL[` or a segment record), not HTML. The rewrite only matched the page URL, so `/business-it/__next._tree.txt` was not a real file and the first WordPress catch-all sent it to `index.php`. The fix adds rules for those `__next.*.txt` files only. It does not add a stop rule for the 26 app URLs.

Production hold: do not publish, deploy, merge, change DNS, change email, or remove WordPress.

## What changed

Air Force blue and gold now continue below the hero on the home page, Business IT, Smart Home, Security, Contact, and the standalone App Center, in all three locales.

- Header `#002B52`. Hero and main blue bands `#003B71`, with a deeper band `#062C52` for credentials and the business-IT process band.
- Ice section background `#E7EEF5` behind white cards. Gold `#D4AF37` is used for rules, buttons, and small labels on blue. Gold buttons keep ink text `#0B1F3A`.
- Small labels on white or ice use dark gold `#6B4F00`, which stays above a 4.5:1 contrast ratio on white, `#E7EEF5`, and `#FFF8E6`.
- Service accents are a left or top edge only: gold for credentials and AI, sky `#7EB6E0` for smart home and business IT cards, Old Glory red `#B22234` as a thin top edge on security cards. The flag SVG is unchanged: 50 stars, union blue `#3C3B6E`.
- App Center is not in the site menu in English, Spanish, or Portuguese, on desktop or in the mobile menu. The direct address `/app-center` still opens the directory, and its 32 links stay there. Footer, home, service, and contact pages do not promote it.

The hero photograph was not regenerated. `public/brand/freddy-profile-hero.jpg` is still the 760×760 pixel window from `(620, 340)` to `(1380, 1100)` of `public/brand/freddy-profile-source.jpg` (1600×1201). The page shows that file at full width with no second `object-position` crop. Desktop and mobile hero screenshots were inspected: both sides of the hair, both ears, glasses, chin, and shoulders are in frame. His wife remains partly visible behind him on the left. Alt text still says it is a personal photograph, not a military portrait.

## Motion

Shared card treatment, no animation library.

| Behavior | Timing | Where |
| --- | --- | --- |
| Hover lift | 4px, 240ms ease, with shadow | Actual cards, and only for a fine pointer that can hover |
| Border / shadow | same 240ms transition | Same cards |
| Count-up | 900ms ease-out | “Since 2004” counts from 2000 to 2004. “2500+” counts from 0 to 2500 |

Cards are not faded out while waiting to scroll. An earlier capture hid below-fold cards at opacity 0, which left empty colored blocks under Credentials, services, the record, and Questions. That hide rule is gone. The card text is in the HTML. With JavaScript off, with reduced motion, or if hydration fails, the cards stay visible. Hover still lifts only when motion is allowed and the pointer can hover.

The hero photograph does not move or zoom. Static cards have no `tabindex` and no button role. “2500+” is the figure already published on the live homepage and in the content inventory. It was not independently audited.

The full-page screenshots below were taken after the page had been scrolled from top to bottom, then inspected. Credential cards, the four service cards, “Since 2004”, “2500+”, and the question list are visible on both desktop and mobile. There is no review section.

## Other additions

- Sticky header. On the home page, a second row links to Credentials, Services, Record, and Questions. Those links get `aria-current` from an intersection observer. Inner pages keep the existing current-page state. Section targets use an 8.75rem scroll margin so the sticky header does not cover them.
- Hero background is a blue gradient mesh behind the content. It does not sit on top of the photograph.
- FAQ accordion uses real service and contact facts: form delivery, the three smart-home ranges with the confirm-before-quoting line, no fixed business IT / security / AI price, the private-business disclaimer, and the Spring Hill address with “Since 2004”. Buttons use `aria-expanded` and `aria-controls`. A production click moved the second question from collapsed to expanded.
- Count-up uses only the published founding year 2004 and the published “2500+” client figure. It does not invent a count of years.
- The review slider is removed in English, Spanish, and Portuguese. There is no placeholder, no example slide, and no nav anchor for reviews. Do not put design examples or unverified Google text back in.

## Contact form

There is no existing mail provider in this repo. The form now posts JSON to `/contact-submit.php`.

- Success text is “Your message was sent.” in English, “Su mensaje fue enviado.” in Spanish, and “Sua mensagem foi enviada.” in Portuguese. It appears only when the server returns `{ "ok": true, "delivered": true }`, which means the SMTP server accepted the message. It does not mean the inbox was opened or a read receipt came back.
- Empty required fields show the existing validation errors and do not submit. A production click on an empty form showed “Check the highlighted fields.”
- A filled production submit, against `next start`, showed “The message could not be sent. Nothing was sent.” plus the email and phone fallback. `next start` does not execute PHP, and the POST returned HTTP 500 with the PHP source rather than JSON. Nothing was sent. This was not a delivery test.
- On Apache, the same file returns HTTP 503 `{ "ok": false, "code": "unconfigured" }` until SMTP settings exist. The form then says “This website cannot send the message yet. Nothing was sent.”
- The email link still opens the visitor’s mail app. That link is not a success state. The note says the message is not sent until the visitor sends it.
- Honeypot field `company_website`. Server validation, a 5-submission / 10-minute limit per IP, and newline stripping are in the PHP. Unit tests cover the success, unconfigured, and honeypot branches with a mock transport. Those tests do not prove live delivery.

### Contact configuration, as of this revision

Recipient change is in the source. It is not live on computingmadeeasy.org.

| Item | Current value |
| --- | --- |
| Endpoint | `POST /contact-submit.php` |
| Fixed recipient | `contactus@computingmadeeasy.org` (`CME_FORM_RECIPIENT`). Set in code after config loads. A `to`, `cc`, `bcc`, `recipient`, or `from` field in the visitor request is discarded. A `to` key in the private config file is discarded. |
| Example sender | `contactus@computingmadeeasy.org` (`from` in `deploy/cme-mail.example.php`, and `CME_FORM_SENDER` when `CME_SMTP_FROM` is unset). |
| Reply-To | The visitor’s email only |
| Public site email and domain | Still `freddy@computingmadeeasy.org` and `computingmadeeasy.org` on the pages, footer, and `mailto:` links. |
| Example non-secret SMTP settings | Written in `deploy/cme-mail.example.php`: host `smtp.ionos.com`, port `587`, encryption `starttls`, username `contactus@computingmadeeasy.org`, From the same address. Password is an empty string. |
| Deployed runtime | Not configured and not published. The example file is not installed on the server. No `CME_SMTP_PASSWORD` is set. The endpoint cannot authenticate and must not report success. |
| Real SMTP delivery test | None. No message was accepted by an SMTP server. No inbox was checked. |
| Unconfigured result | HTTP 503 `{ "ok": false, "code": "unconfigured" }` when host, user, or password is missing. The page says the website cannot send yet and that nothing was sent, then offers phone and email. |
| `next start` | Does not run PHP. A browser submit there shows that the message could not be sent. That is not delivery. |

Names the parent must fill on the server, with no values in this repo:

- `CME_SMTP_HOST` (required)
- `CME_SMTP_USER` (required)
- `CME_SMTP_PASSWORD` (required secret)
- `CME_SMTP_PORT` (optional, default `587`)
- `CME_SMTP_ENCRYPTION` (optional, default `starttls`; `ssl` is the other accepted value)
- `CME_SMTP_FROM` (optional, default `contactus@computingmadeeasy.org`)
- `CME_MAIL_CONFIG` (optional path to a private PHP file; default is `../private/cme-mail.php` when the script is in the document root)

`CME_SMTP_TO` is not read. The recipient stays `contactus@computingmadeeasy.org`.

### Example settings versus a live send

`deploy/cme-mail.example.php` holds the non-secret mailbox settings: `smtp.ionos.com`, port 587, STARTTLS, username `contactus@computingmadeeasy.org`, and From that same address. `password` is present and empty. That file is an example. It is not loaded by the site, and it is not installed on IONOS.

The running endpoint stays unconfigured until a private copy of that file, or `CME_SMTP_PASSWORD`, is supplied outside the repo. The parent is arranging a secure way to provide the mailbox password. It is separate from the IONOS panel login. This package does not contain a password. No send was attempted. The public site is not published.

A later check, only on a path the parent approves, is: set the password outside git, POST one message, require HTTP 200 with `delivered: true`, and look in `contactus@computingmadeeasy.org`. Reply-To should be the visitor’s address. The public mailto address should still be `freddy@computingmadeeasy.org`.

## Hosting options

Live site, from the read-only check supplied for this pass: IONOS Apache, PHP 8.3.36, WordPress. No Vercel project. Cloudflare has no zone. IONOS Deploy Now can run Node at build time. It does not keep a Node server running. Moving the apex is not required.

### Option A — static export plus PHP (fits the current host)

`npm run export` sets `CME_STATIC_EXPORT=1` and runs `next build` with `output: "export"`, `trailingSlash: true`, and unoptimized images. That command completed in this workspace. HTML is written to:

- `out/en/index.html`, `out/en/business-it/index.html`, `out/en/smart-home/index.html`, `out/en/security/index.html`, `out/en/contact/index.html`, `out/en/app-center/index.html`
- the same six pages under `out/es/` and `out/pt-br/`
- `out/contact-submit.php`, `out/_next/`, `out/brand/`

`output: "export"` turns off `proxy.ts`. Apache has to do that job. The live document root is `/clickandbuilds/ComputingMadeEasy`. Its `.htaccess` has an unmarked WordPress catch-all before the IONOS cache and before `# BEGIN WordPress`. The merged file `deploy/clickandbuilds-ComputingMadeEasy.htaccess` inserts the v5 rules immediately before that first catch-all and leaves every following byte unchanged, including `AddHandler x-mapp-php5.5  .php`. That handler was not edited. The account is PHP 8.3; after upload, check which PHP version actually runs `contact-submit.php`.

The rules name only `/`, `/business-it`, `/smart-home`, `/security`, `/contact`, `/app-center`, `/es`, `/pt-br`, and `/en`. They do not use a pass-through `[L]` for the 26 app names. Only `biblical-pharmacy` is a physical directory. The other 25 still need the existing catch-all so WordPress can serve them. Those names are not marketing routes, so they fall through as they do now. `wp-admin`, `wp-content`, and `wp-includes` are real directories and stay on that path too.

A physical `/app-center` directory was not in the root listing. The marketing rule is still before the catch-all, so a later folder of that name cannot hide the v5 page. Files under an old folder are not deleted.

Copy `cme-static/`, `_next/`, `brand/`, and `contact-submit.php` into the document root. Do not replace `index.php`. Replace `.htaccess` only with the merged file. Rollback is putting the pre-cutover `.htaccess` back. `index.php` then serves `/` again. MX, SPF, and the existing `www` → apex 301 stay as they are.

`lib/preserved-apps.ts` tells the Next proxy to skip those trees if a request reaches Next. On Apache they stay with WordPress or, for `biblical-pharmacy`, the real directory.

Node is not required for this option. The pages are static files. Mail is PHP.

### Option B — `next start` (needs a long-running Node process)

`npx next build` then `npx next start` is what was used for the local checks. `proxy.ts` rewrites unprefixed English URLs to `/en/...` and redirects `/en/contact` to `/contact` (HTTP 307 in the local check). This host does not execute `contact-submit.php`, so the form cannot deliver mail here.

IONOS Deploy Now does not provide this runtime. A Node host would still need the web server to send the 26 app directories (and WordPress, until it is retired) somewhere other than the Node process. There is no reason to move the apex to get that.

### Blockers before any cutover

- The parent is still checking the IONOS contract, whether custom Apache rewrites are allowed, whether authenticated SMTP is allowed, and whether a backup exists. No change was made from here.
- SMTP is not configured. No delivery test has run. Success wording does not claim the message was read.
- The review section is removed. Do not restore example slides.
- `?interest=` is read in the browser, so the static pages can still preselect Smart Home, Business IT, Security, or AI.
- The document element starts as `lang="en"`. Each page wraps its content in the right language, and a small script updates the document element after load. With JavaScript off, the document element stays `en`. That is not a reason to require Node.
- getgloballisting.com is only an external App Center link. It was not changed.
- No paid signup, no Vercel project, no Cloudflare zone, no DNS edit.

`npm run export` rewrites the document element after the static build: `out/en` is `lang="en"`, `out/es` is `lang="es"`, and `out/pt-br` is `lang="pt-BR"`. Those files were checked, including `out/es/index.html` and `out/pt-br/index.html`. The language is in the HTML, so it does not wait for JavaScript. On `next start`, a small script still sets the same language after load because one root layout serves every locale.

## Checks run

- `npx vitest run` — 21 passed
- `npx tsc --noEmit` — passed
- `npx eslint .` — no errors
- `npx next build` — passed
- `npm run export` — passed, then the language script checked six exported HTML files

## Screenshots inspected

Each full page was scrolled from top to bottom, returned to scrollY 0, and checked so the header sits above the name and photo. The header was left in normal document flow for the capture so the sticky bar is not painted across the hero. Cards stay visible. No review section is present.

- `/workspace/Computing_Made_Easy_Redesign_v5_home_desktop.png`
- `/workspace/Computing_Made_Easy_Redesign_v5_home_mobile.png`
- `/workspace/Computing_Made_Easy_Redesign_v5_home_es_desktop.png`
- `/workspace/Computing_Made_Easy_Redesign_v5_home_es_mobile.png`
- `/workspace/Computing_Made_Easy_Redesign_v5_home_pt_desktop.png`
- `/workspace/Computing_Made_Easy_Redesign_v5_home_pt_mobile.png`
- `/opt/cursor/artifacts/v5_home_desktop.png`
- `/opt/cursor/artifacts/v5_home_mobile.png`
- `/opt/cursor/artifacts/v5_home_es_desktop.png`
- `/opt/cursor/artifacts/v5_home_es_mobile.png`
- `/opt/cursor/artifacts/v5_home_pt_desktop.png`
- `/opt/cursor/artifacts/v5_home_pt_mobile.png`

English, Spanish, and Portuguese desktop and mobile tops show the header, then the name, with the face fully in the photo. Credential cards are filled.

Package: `Computing_Made_Easy_Redesign_v5.zip`. It excludes `.git`, `node_modules`, `.next`, `out`, and env files.
