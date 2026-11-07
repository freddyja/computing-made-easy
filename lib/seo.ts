import type { Metadata } from "next";
import { getDictionary } from "./dictionary";
import {
  absoluteUrl,
  htmlLang,
  locales,
  publicHref,
  type Locale,
  type PageId,
} from "./routes";

export function buildMetadata(locale: Locale, page: PageId): Metadata {
  const dictionary = getDictionary(locale);
  const meta = dictionary.meta[page];
  const canonical = absoluteUrl(publicHref(locale, page));
  const languages: Record<string, string> = {
    "x-default": absoluteUrl(publicHref("en", page)),
  };
  for (const item of locales) {
    languages[htmlLang(item)] = absoluteUrl(publicHref(item, page));
  }
  return {
    title: page === "home" ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: { canonical, languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      locale: dictionary.ogLocale,
      type: "website",
      siteName: "Computing Made Easy",
    },
  };
}
