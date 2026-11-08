# Computing Made Easy — Redesign review notes v2

**Date:** 6 November 2026  
**Repo:** `freddyja/computing-made-easy`, branch `feat/nextjs-redesign`  
**Live site:** WordPress on IONOS. This repo was not published. **No public demo exists.**

Draft and proposed wording is marked below. Translations follow the English. They do not add offers.

## Hero order

The home page leads with service, then credentials, then the work:

1. Flag of the United States, then the heading **Retired United States Air Force** and **Freddy Jara-Almonte**.
2. Credentials, directly under that story.
3. Then AI, Smart Home, IT support, and Security, with links to the service pages and contact.
4. The closing “Ready when you are” ask.

The old headline “IT and smart homes that just work” is still on the page, as the heading of the services section, not as the hero.

## Proposed copy — owner review before any publish

These lines are new connective copy. They are not on the live WordPress pages.

- **Hero story.** “Retired from the United States Air Force, Freddy Jara-Almonte still shows up for people here at home…” It uses only retired USAF service, the local area, and Since 2004. It does not state rank, years in uniform, duties, bases, or deployments.
- **Endorsement line.** Computing Made Easy is a private business. The site is not a U.S. government or Air Force program. This is here so the flag is not read as an official endorsement.
- **AI section (home, item 01).** Practical help with AI tools, limited to what someone needs. The only examples named are tools already on the domain: live captions in English, Spanish, and Portuguese; voice notes; and the Hot Dog Stop AI ordering demo, which the live App Center already calls a demo with no payment and no order. **No class calendar, no AI price, and no new capability.**
- **Contact form option “AI”.** Proposed. The other options match the live form: Business IT, Smart Home, Security, General question. Default remains Smart Home.
- **Metadata** (titles and descriptions) for home, business IT, smart home, security, and contact. The live theme pages did not have meta descriptions. App Center’s English title and description match the live hub: “Freddy's App Central” and “A curated collection of websites crafted for real businesses by Freddy.”
- **JSON-LD** on the home page repeats the same verified contact facts and credentials. It has no hours, no star rating, and no price range.
- **Navigation order.** Services, then App Center, then the free-quote button. The live header order was Contact, Security, Business IT, Smart Home, App Center. The routes are the same. The order is a reversible layout choice.
- **Form button.** The label is “Open email to send,” not “Send message.” The note above the button says the site does not send anything.

Spanish and Portuguese versions of the hero, the AI section, and the metadata are translations of those drafts. They are not separate offers.

## Credentials — owner-confirmed, shown as text

Shown in this order on the home page and again on Contact:

- Retired United States Air Force
- Microsoft Certified Engineer (those exact words, in every language)
- Bachelor of Science in Information Systems Security, ITT Technical Institute, Albuquerque, NM, March 19, 2010
- The bachelor’s area of expertise is cybersecurity, including ethical hacking. The page says this is **one degree**, not a second diploma. It does **not** say Certified Ethical Hacker or CEH.
- Associate of Applied Science in Information Technology – Computer Network Systems, ITT Technical Institute, Albuquerque, NM, March 14, 2008
- Highest Honors Award (3.8–4.0 GPA across the entire degree program), ITT Technical Institute
- Since 2004
- 2500+ clients, veteran-owned, Spring Hill / Brooksville / Central Florida

The live site does not publish a separate “years of experience” number. This redesign does not invent one. It says Since 2004.

Not stated, because they were not in the verified set: rank, medals, years served, deployments, security clearance, CompTIA or other vendor certificates, certificate IDs, issuing dates for Microsoft Certified Engineer, any expansion of that title into MCSE, and the truncated University of Phoenix entry.

These credentials were supplied as owner-confirmed for this redesign. This pass did not re-check transcripts or certificates against a registrar.

## Preserved from the live site

- Phone `407-925-2589` (`tel:+14079252589`)
- Email `freddy@computingmadeeasy.org`
- Address `1720 Alameda Dr, Spring Hill FL` with **no ZIP**
- Since 2004, veteran-owned, 2500+ / ~2500 clients
- Business IT, Smart Home, and Security routes and their service descriptions
- Smart Home ranges $1,500–$2,000, $2,500–$3,500, $4,000–$5,500, product lists, and the line to confirm before quoting
- No security price list
- Business IT has no fixed packages; price is scoped after discovery
- Contact fields: name, email, phone optional, service interest, message
- Mailto behavior, with the subject pattern `Website inquiry — {interest} — {name}`
- Same-business-day response note. That is not a published hours table.
- Nathan JaraAlmonte on Smart Home
- App Center: 32 sites, original names and taglines, original groups (8 / 5 / 11 / 2 / 1 / 5), including Life Church under Tools
- External app links unchanged
- Navy `#0B1F3A` and electric `#2563EB`

Client taglines in App Center stay in the language they already use. The directory chrome (headings, “Visit site”) is translated. That is intentional, so a client’s own line is not rewritten.

## Assets

- **Logo** (`public/brand/logo.jpg`, mark cropped to `public/brand/mark.png`). This is the supplied Computing Made Easy lockup, not a new drawing. The header uses the house mark plus HTML text so the name stays readable and is the accessible name. The full lockup’s wordmark is too small at header size. The footer uses text on navy, not the dark wordmark on navy, so contrast holds. The small red star is decorative.
- **Portrait** (`public/brand/portrait.jpg`). Used as Freddy Jara-Almonte because that is the supplied portrait. Alt text names him. No text sits on the face. **The live site does not show this photograph.** Confirm the likeness before any public cutover.
- **Flag.** Drawn in the page: 13 stripes (7 red, 6 white), 50 stars in the staggered 6/5 grid, fly 1.9 times the hoist, union width 0.76 times the hoist, colors Old Glory Red `#B22234`, White `#FFFFFF`, Old Glory Blue `#3C3B6E`. It is large in the home hero. Inner pages show it again in a band under the header, about 160px wide, with the words Retired United States Air Force. It is not a footer icon. Nothing is written on the flag.

The live WordPress favicon is a military metal-art image. This redesign uses the supplied logo mark instead. Confirm that before cutover.

## Checks run in this pass

- `npx vitest run` — 12 tests passed (paths, 32 app links, mailto, credentials, forbidden claims, flag geometry, prices, contrast).
- `npx tsc --noEmit` and `npx next build` — succeeded.
- `npx eslint .` — no errors after the unused-variable cleanup.
- Production server on a local port only: English `/` is `lang=en` and rewrites internally to `/en`; `/es` is `lang=es`; `/pt-br` is `lang=pt-BR`; `/en/contact` redirects to `/contact`.
- The flag SVG has 50 stars. A pixel check of the desktop screenshot put the union at about 40% of the fly.
- Empty contact submit showed “Check the highlighted fields.” on name, email, and message, and the mailto explanation stayed visible.
- Mobile menu opened with `aria-expanded`, and Escape closed it.
- Screenshots: home, smart home, security, contact, App Center, Spanish home, Portuguese home, mobile menu, and the validation state. Desktop, tablet, and mobile widths.

## Not done

No deploy, no DNS, no email change, no WordPress write, no GBP, no purchase, no github.io, no preview host. See the migration plan. It is a plan only.
