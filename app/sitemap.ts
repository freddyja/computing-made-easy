import type { MetadataRoute } from "next";
import { absoluteUrl, htmlLang, locales, pages, publicHref } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: absoluteUrl(publicHref("en", page)),
    alternates: {
      languages: Object.fromEntries([
        ...locales.map((locale) => [htmlLang(locale), absoluteUrl(publicHref(locale, page))]),
        ["x-default", absoluteUrl(publicHref("en", page))],
      ]),
    },
  }));
}
