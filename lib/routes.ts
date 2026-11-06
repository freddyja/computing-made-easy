export const locales = ["en", "es", "pt-br"] as const;
export type Locale = (typeof locales)[number];

export const pages = [
  "home",
  "business-it",
  "smart-home",
  "security",
  "contact",
  "app-center",
] as const;
export type PageId = (typeof pages)[number];

export const contentPages = [
  "business-it",
  "smart-home",
  "security",
  "contact",
  "app-center",
] as const;
export type ContentPage = (typeof contentPages)[number];

/** Home narrative, then credentials, then services, then the closing ask. */
export const homeSectionOrder = [
  "service",
  "credentials",
  "focus",
  "close",
] as const;

export const focusIds = [
  "ai",
  "smart-home",
  "business-it",
  "security",
] as const;
export type FocusId = (typeof focusIds)[number];

export const LOCALE_HEADER = "x-locale";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function isPage(value: string): value is ContentPage {
  return (contentPages as readonly string[]).includes(value);
}

export function htmlLang(locale: Locale): "en" | "es" | "pt-BR" {
  if (locale === "es") return "es";
  if (locale === "pt-br") return "pt-BR";
  return "en";
}

export function publicHref(locale: Locale, page: PageId): string {
  const slug = page === "home" ? "" : `/${page}`;
  if (locale === "en") return slug || "/";
  return `/${locale}${slug}`;
}

export function absoluteUrl(path: string): string {
  if (path === "/") return "https://computingmadeeasy.org/";
  return `https://computingmadeeasy.org${path}`;
}

export function parsePath(pathname: string): { locale: Locale; page: PageId } {
  const parts = pathname.split("/").filter(Boolean);
  let locale: Locale = "en";
  if (parts[0] === "es" || parts[0] === "pt-br" || parts[0] === "en") {
    locale = parts[0] === "en" ? "en" : parts[0];
    parts.shift();
  }
  const head = parts[0] ?? "home";
  const page: PageId = (pages as readonly string[]).includes(head)
    ? (head as PageId)
    : "home";
  return { locale, page };
}

export function switchLocale(pathname: string, next: Locale): string {
  return publicHref(next, parsePath(pathname).page);
}

export function focusLinks(
  locale: Locale,
  id: FocusId,
): { primary: string; secondary: string } {
  const contact = (interest: string) =>
    `${publicHref(locale, "contact")}?interest=${interest}`;
  switch (id) {
    case "ai":
      return {
        primary: contact("ai"),
        secondary: `${publicHref(locale, "app-center")}#tools`,
      };
    case "smart-home":
      return {
        primary: publicHref(locale, "smart-home"),
        secondary: contact("smart-home"),
      };
    case "business-it":
      return {
        primary: publicHref(locale, "business-it"),
        secondary: contact("business-it"),
      };
    case "security":
      return {
        primary: publicHref(locale, "security"),
        secondary: contact("security"),
      };
  }
}

export function isHomePath(pathname: string): boolean {
  const bare = pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
  return bare === "/" || bare === "/es" || bare === "/pt-br" || bare === "/en";
}

export type LocaleResolution =
  | { action: "skip" }
  | { action: "redirect"; to: string }
  | { action: "rewrite"; to: string; locale: "en" }
  | { action: "next"; locale: "es" | "pt-br" };

function normalize(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

/** English stays on the live unprefixed paths. /en redirects so it cannot duplicate them. */
export function resolveLocaleRequest(pathname: string): LocaleResolution {
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/brand") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.png" ||
    pathname === "/apple-icon.png"
  ) {
    return { action: "skip" };
  }
  const path = normalize(pathname);
  if (/\.[a-zA-Z0-9]+$/.test(path)) return { action: "skip" };

  if (path === "/en") return { action: "redirect", to: "/" };
  if (path.startsWith("/en/")) {
    return { action: "redirect", to: path.slice(3) || "/" };
  }
  if (path === "/es" || path.startsWith("/es/")) {
    return { action: "next", locale: "es" };
  }
  if (path === "/pt-br" || path.startsWith("/pt-br/")) {
    return { action: "next", locale: "pt-br" };
  }
  const to = path === "/" ? "/en" : `/en${path}`;
  return { action: "rewrite", to, locale: "en" };
}
