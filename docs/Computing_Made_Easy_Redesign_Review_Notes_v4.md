# Computing Made Easy — Redesign review notes v4

**Date:** 7 November 2026  
**Supersedes:** v3 notes and `Computing_Made_Easy_Redesign_v3.zip` for delivery  
**Branch:** `feat/nextjs-redesign`  
**Not published.** No public demo. No DNS, email, hosting, or WordPress change.

## Photo

The hero uses the owner-selected photograph. The first square was too far right and cut off the left side of Freddy’s face. The replacement window, measured on the 1600×1201 source, is pixels (620, 340) through (1380, 1100). That keeps both sides of his hair, both ears, his glasses, chin, and shoulders in frame, with his wife only partly visible behind him. No pixels were generated or retouched. The full oriented original remains `public/brand/freddy-profile-source.jpg`. The invented placeholder `public/brand/portrait.jpg` stays removed.

The “Placeholder — verify likeness” label is gone in English, Spanish, and Brazilian Portuguese. Alt text names Freddy and says it is a personal photograph, not a military portrait. The caption is his name only.

## Unchanged in this pass

Blue `#003B71` / header `#002B52`, gold `#D4AF37` with ink text on gold buttons, the Air Force-first hero, the national flag colors, the credential facts, the name spelling Freddy Jara-Almonte, and App Center as its own page reached only from the nav tab. All three site languages remain.

Hero support lines, quote labels, and the private-business disclaimer are still draft wording.

## Checks

- `npx vitest run` — 13 passed
- `npx tsc --noEmit` — passed as part of `npx next build`
- `npx eslint .` — no errors
- `npx next build` — passed
- Local production screenshots were inspected, not only measured: `v4_home_desktop_final.png` and `v4_home_mobile_final.png`. Both show Freddy’s full head (both sides of his hair, both ears, glasses, chin) and his shoulders. His wife is only partly visible behind him. The placeholder label is absent.
