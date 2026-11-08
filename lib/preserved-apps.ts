/** On-domain App Center child apps. Apache must serve these directories. Next must not claim them. */

export const preservedAppPaths = [
  "anibal-handyman",
  "organic-house-cleaning",
  "russ-bogun-auto",
  "gt-details",
  "chairside",
  "arcup-electrical",
  "pedro-woodcraft",
  "enclosed-trailer",
  "paella-de-yoansy",
  "frutas-de-yuniert",
  "brazilian-acai",
  "olas-ordering",
  "hotdog-stop-demo",
  "fire-and-fellowship",
  "faithful-service-network",
  "kingdom-sisters",
  "fathers-charge",
  "60-Seconds-in-the-Word-for-women",
  "60-seconds-in-the-word",
  "biblical-pharmacy",
  "christian-food-pantry-intake",
  "bible-verse-tracker",
  "fruit-of-the-spirit",
  "hannah-creations",
  "doula-edu",
  "life-church-tap",
] as const;

const preserved = new Set<string>(preservedAppPaths);

export function isPreservedAppPath(pathname: string): boolean {
  const bare = pathname.split("?")[0]?.split("#")[0] ?? pathname;
  const head = bare.replace(/^\/+/, "").split("/")[0] ?? "";
  return preserved.has(head);
}
