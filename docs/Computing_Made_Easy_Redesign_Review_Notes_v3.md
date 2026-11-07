# Computing Made Easy — Redesign review notes v3

**Date:** 7 November 2026  
**Supersedes:** review notes v2 and `Computing_Made_Easy_Redesign_v2.zip`  
**Branch:** `feat/nextjs-redesign`  
**Not published.** No public demo. No DNS, email, hosting, or WordPress change.

This pass applies the Claude Bridge design-only spec on top of the existing v3 work. It does not rebuild from the white v2 layout.

## What the spec changed

- Tokens now match the Bridge sheet: brand blue `#003B71`, header blue `#002B52`, gold `#D4AF37`, gold hover `#E4C45C`, ink `#0B1F3A`, paper `#F4F6F8`.
- The hero is a solid blue field, not a pale grid. Desktop columns are about 25 / 45 / 30: flag, copy, portrait. On a phone the order is name, flag, short credentials and actions, then portrait.
- Gold buttons use ink text and a blue border so the edge still shows on white. Bright gold is not used as text on white (`#FFFFFF` on `#D4AF37` is under 3:1). Gold text is used on the blues, where it clears 4.5:1.
- Secondary actions on blue are white text with a white border. Pressed buttons get an inset blue edge and do not move. Focus is a 3px ring: white on blue, blue on white, and a white ring with a blue separator on gold buttons.
- The header is at least 88px tall. App Center remains one header tab, including the mobile menu. It is not in the footer or in page body copy.
- The portrait is labeled **Placeholder — verify likeness** (and the Spanish and Portuguese equivalents). The alt text says the likeness is not confirmed. The name on the page stays **Freddy Jara-Almonte**, the spelling already in the site, not the unhyphenated form in the spec table.

## Draft wording from the spec

Hero support, quote label, “Call Freddy”, the shorter private-business disclaimer, the Portuguese hero line “Militar reformado…”, and the portrait label are draft. The credential block still uses the owner-confirmed degree names, dates, Microsoft Certified Engineer, ethical hacking as part of that one bachelor’s degree, Highest Honors, and Since 2004. The phone number is still 407-925-2589.

## App Center

`/app-center`, `/es/app-center`, and `/pt-br/app-center` are a separate directory with a back link and a language switch. All 32 destinations remain. Child apps were not moved or deleted.

## Checks run for this pass

- `npx vitest run` — 13 passed (routes, 32 links, isolation, mailto, credentials, flag geometry, Bridge contrast pairs, name spelling, placeholder label).
- `npx tsc --noEmit` — passed.
- `npx eslint .` — no errors.
- `npx next build` — passed.
