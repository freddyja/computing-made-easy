# Computing Made Easy — Redesign review notes v4

**Date:** 7 November 2026  
**Supersedes:** v3 notes and `Computing_Made_Easy_Redesign_v3.zip` for delivery  
**Branch:** `feat/nextjs-redesign`  
**Not published.** No public demo. No DNS, email, hosting, or WordPress change.

## Photo

The hero now uses the owner-selected photograph of Freddy Jara-Almonte. The shipped display file is a square window of the original pixels, aimed at Freddy in the foreground (gray hair, glasses). His wife is not the subject of that window. The face was not generated, retouched, or redrawn. The full oriented original is kept at `public/brand/freddy-profile-source.jpg`. The unused invented placeholder `public/brand/portrait.jpg` is removed.

The “Placeholder — verify likeness” label is gone in English, Spanish, and Brazilian Portuguese. Alt text names Freddy and says it is a personal photograph, not a military portrait. The caption is his name only.

## Unchanged in this pass

Blue `#003B71` / header `#002B52`, gold `#D4AF37` with ink text on gold buttons, the Air Force-first hero, the national flag colors, the credential facts, the name spelling Freddy Jara-Almonte, and App Center as its own page reached only from the nav tab. All three site languages remain.

Hero support lines, quote labels, and the private-business disclaimer are still draft wording.

## Checks

- `npx vitest run` — 13 passed
- `npx tsc --noEmit` — passed as part of `npx next build`
- `npx eslint .` — no errors
- `npx next build` — passed
- Local production screenshots: desktop `v4_home_desktop_final.png` and mobile `v4_home_mobile_final.png`. The hero image is the owner photo, Freddy in the foreground. The placeholder label is absent. Alt text says it is a personal photograph, not a military portrait.
