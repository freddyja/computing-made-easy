# Computing Made Easy — Redesign review notes v3

**Date:** 7 November 2026  
**Supersedes:** review notes v2 and source archive `Computing_Made_Easy_Redesign_v2.zip`  
**Pull request:** https://github.com/freddyja/computing-made-easy/pull/1  
**Not published.** No public demo. No DNS, email, hosting, or WordPress change.

v3 is a color revision plus an App Center split. The Air Force-first story, credentials, prices, contact behavior, and the 32 app links are unchanged in substance.

## Color

Palette, inspired by U.S. Air Force blue and gold. It is not a recolor of the United States flag and it is not an official service emblem.

| Role | Hex | Where |
|------|-----|--------|
| Air Force blue | `#00308F` | Header, hero, service intros, services band |
| Deeper blue | `#00266E` | Identity band, footer, closing band |
| Gold | `#FFCD00` | Buttons, active nav, highlights on blue |
| Dark gold ink | `#6B4F00` | Links and small labels on white or the ice background |
| Ice | `#E4ECF7` | Supporting page background |
| White | `#FFFFFF` | Flag mat, portrait mat, form fields, package cards |

Bright gold text is not used on white. Measured contrast: white on `#00308F` and `#00308F` on `#FFCD00` are above 4.5:1. `#FFCD00` on white is below 3:1 and is not used for text. Gold buttons use Air Force blue text. Focus rings are gold, and gold buttons use a blue focus ring. Hover and active states darken the gold or switch a gold outline to a gold fill with blue text.

The national flag stays Old Glory red `#B22234`, white `#FFFFFF`, and Old Glory blue `#3C3B6E`, with 13 stripes and 50 stars. Nothing was written on the flag.

## App Center is its own page

- Header tab, desktop and mobile: one link to `/app-center`, `/es/app-center`, or `/pt-br/app-center`.
- Footer does not link to it. Home, service pages, and contact do not embed the directory, cards, or a “see the tools” link.
- The proposed AI paragraph no longer names the ordering demo, captions, or voice notes. It stays practical help, with no class calendar and no price. That wording is still draft.
- `/app-center` is a directory only: back link to the marketing home, language switch, the 32 original links and taglines. Child app paths on the domain are not deleted or moved.

## Checks actually run

- `npx vitest run` — 13 tests passed, including App Center isolation, the 32 links, mailto, credentials, flag geometry, and the color contrast pairs.
- `npx eslint .` — no errors.
- `npx next build` — passed, including its TypeScript check.
- Local production server only: home has one `app-center` href, in the header; the footer does not. `/business-it`, `/smart-home`, `/security`, `/contact`, `/es`, and `/pt-br` have no `app-center` link outside the header. All 32 catalog URLs are present on `/app-center`. The flag SVG still uses `#3C3B6E` and 50 stars. Empty contact submit shows field errors and the mailto explanation.

Screenshots for this revision use the `v3_` prefix in the artifacts folder.
