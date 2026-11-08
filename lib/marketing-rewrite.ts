const marketingPages = ["business-it", "smart-home", "security", "contact", "app-center"] as const;
const prefixedLocales = ["es", "pt-br"] as const;
const rscName = "__next\\.[^/]+\\.txt";

export type MarketingRewrite =
  | { action: "redirect"; to: string }
  | { action: "rewrite"; to: string }
  | { action: "wordpress" };

/** Mirrors the CME block in the live .htaccess. Null-style wordpress means the existing catch-all still runs. */
export function rewriteMarketingRequest(input: string): MarketingRewrite {
  const pathOnly = input.split("?")[0] ?? input;
  const bare = pathOnly.replace(/\/+$/, "");
  const rel = bare.replace(/^\//, "");

  if (rel === "en") return { action: "redirect", to: "/" };
  if (rel.startsWith("en/")) return { action: "redirect", to: `/${rel.slice(3)}` };

  if (rel === "") return { action: "rewrite", to: "/cme-static/en/index.html" };
  if (new RegExp(`^${rscName}$`).test(rel)) {
    return { action: "rewrite", to: `/cme-static/en/${rel}` };
  }

  const page = marketingPages.join("|");
  const pageOnly = new RegExp(`^(${page})$`);
  const pageRsc = new RegExp(`^(${page})/(${rscName})$`);
  const pageMatch = rel.match(pageOnly);
  if (pageMatch) return { action: "rewrite", to: `/cme-static/en/${pageMatch[1]}/index.html` };
  const pageFile = rel.match(pageRsc);
  if (pageFile) return { action: "rewrite", to: `/cme-static/en/${pageFile[1]}/${pageFile[2]}` };

  const localeOnly = rel.match(/^(es|pt-br)$/);
  if (localeOnly) return { action: "rewrite", to: `/cme-static/${localeOnly[1]}/index.html` };
  const localeRsc = rel.match(new RegExp(`^(es|pt-br)/(${rscName})$`));
  if (localeRsc) return { action: "rewrite", to: `/cme-static/${localeRsc[1]}/${localeRsc[2]}` };
  const localePage = rel.match(new RegExp(`^(es|pt-br)/(${page})$`));
  if (localePage) return { action: "rewrite", to: `/cme-static/${localePage[1]}/${localePage[2]}/index.html` };
  const localePageRsc = rel.match(new RegExp(`^(es|pt-br)/(${page})/(${rscName})$`));
  if (localePageRsc) {
    return {
      action: "rewrite",
      to: `/cme-static/${localePageRsc[1]}/${localePageRsc[2]}/${localePageRsc[3]}`,
    };
  }

  return { action: "wordpress" };
}

export { marketingPages, prefixedLocales };
