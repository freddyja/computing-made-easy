import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { allApps, appGroups } from "../lib/apps";
import { buildMailto, parseInterest, validateContact } from "../lib/contact";
import { getDictionary } from "../lib/dictionary";
import { en } from "../lib/dictionary/en";
import { FLAG_COLORS, FLAG_VIEW, flagModel, starPoints } from "../lib/flag";
import { isPreservedAppPath, preservedAppPaths } from "../lib/preserved-apps";
import {
  focusIds,
  focusLinks,
  homeSectionOrder,
  pages,
  publicHref,
  resolveLocaleRequest,
  switchLocale,
} from "../lib/routes";
import { site, smartHomePackages } from "../lib/site";

const expectedHrefs = [
  "https://computingmadeeasy.org/anibal-handyman/",
  "https://computingmadeeasy.org/organic-house-cleaning/",
  "https://computingmadeeasy.org/russ-bogun-auto/",
  "https://computingmadeeasy.org/gt-details/",
  "https://computingmadeeasy.org/chairside/",
  "https://computingmadeeasy.org/arcup-electrical/",
  "https://computingmadeeasy.org/pedro-woodcraft/",
  "https://computingmadeeasy.org/enclosed-trailer/",
  "https://computingmadeeasy.org/paella-de-yoansy/",
  "https://computingmadeeasy.org/frutas-de-yuniert/",
  "https://computingmadeeasy.org/brazilian-acai/",
  "https://computingmadeeasy.org/olas-ordering/",
  "https://computingmadeeasy.org/hotdog-stop-demo/",
  "https://computingmadeeasy.org/fire-and-fellowship/",
  "https://computingmadeeasy.org/faithful-service-network/",
  "https://computingmadeeasy.org/kingdom-sisters/",
  "https://computingmadeeasy.org/fathers-charge/",
  "https://computingmadeeasy.org/60-Seconds-in-the-Word-for-women/",
  "https://computingmadeeasy.org/60-seconds-in-the-word/",
  "https://computingmadeeasy.org/biblical-pharmacy/",
  "https://www.etsy.com/listing/4582102485/biblical-pharmacy-educational-herb",
  "https://computingmadeeasy.org/christian-food-pantry-intake/",
  "https://computingmadeeasy.org/bible-verse-tracker/",
  "https://computingmadeeasy.org/fruit-of-the-spirit/",
  "https://computingmadeeasy.org/hannah-creations/",
  "https://computingmadeeasy.org/doula-edu/",
  "https://getgloballisting.com/Grokbot%20GGL/Get%20Global%20Listing/index.html",
  "https://meeting-translator-captions.onrender.com/",
  "https://fire-fellowship-captions.onrender.com/",
  "https://360show.vercel.app/",
  "https://computingmadeeasy.org/life-church-tap/",
  "https://party-requests-flax.vercel.app/r",
];

function keyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => keyPaths(item, `${prefix}[${index}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      keyPaths(item, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

function stringsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringsOf);
  if (value && typeof value === "object") return Object.values(value).flatMap(stringsOf);
  return [];
}

function contrast(hexA: string, hexB: string): number {
  const lum = (hex: string) => {
    const channels = [1, 3, 5].map((index) => {
      const value = parseInt(hex.slice(index, index + 2), 16) / 255;
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const [lighter, darker] = [lum(hexA), lum(hexB)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("routes and locales", () => {
  it("keeps the live English paths and prefixes es and pt-br", () => {
    expect(publicHref("en", "home")).toBe("/");
    expect(publicHref("en", "business-it")).toBe("/business-it");
    expect(publicHref("en", "smart-home")).toBe("/smart-home");
    expect(publicHref("en", "security")).toBe("/security");
    expect(publicHref("en", "contact")).toBe("/contact");
    expect(publicHref("en", "app-center")).toBe("/app-center");
    expect(publicHref("es", "contact")).toBe("/es/contact");
    expect(publicHref("pt-br", "smart-home")).toBe("/pt-br/smart-home");
  });

  it("rewrites English, redirects /en, and leaves translated prefixes", () => {
    for (const page of pages) {
      const path = publicHref("en", page);
      const resolution = resolveLocaleRequest(path);
      expect(resolution).toMatchObject({ action: "rewrite", locale: "en" });
    }
    expect(resolveLocaleRequest("/en/contact")).toEqual({ action: "redirect", to: "/contact" });
    expect(resolveLocaleRequest("/es/security")).toEqual({ action: "next", locale: "es" });
    expect(resolveLocaleRequest("/pt-br")).toEqual({ action: "next", locale: "pt-br" });
    expect(preservedAppPaths).toHaveLength(26);
    for (const app of preservedAppPaths) {
      expect(isPreservedAppPath(`/${app}`)).toBe(true);
      expect(isPreservedAppPath(`/${app}/`)).toBe(true);
      expect(isPreservedAppPath(`/${app}/index.html`)).toBe(true);
      expect(resolveLocaleRequest(`/${app}/`)).toEqual({ action: "skip" });
      expect(resolveLocaleRequest(`/${app}/schedule`)).toEqual({ action: "skip" });
    }
    expect(resolveLocaleRequest("/contact-submit.php")).toEqual({ action: "skip" });
  });

  it("switches language without dropping the page", () => {
    expect(switchLocale("/smart-home", "es")).toBe("/es/smart-home");
    expect(switchLocale("/es/contact", "pt-br")).toBe("/pt-br/contact");
    expect(switchLocale("/pt-br/app-center", "en")).toBe("/app-center");
  });

  it("leads home with service, then credentials, then AI and the other work", () => {
    expect(homeSectionOrder).toEqual([
      "service",
      "credentials",
      "focus",
      "record",
      "questions",
      "examples",
      "close",
    ]);
    expect(focusIds).toEqual(["ai", "smart-home", "business-it", "security"]);
    expect(focusLinks("en", "ai").primary).toBe("/contact?interest=ai");
    expect(focusLinks("en", "ai").secondary).toBeUndefined();
    expect(focusLinks("es", "ai").primary).toBe("/es/contact?interest=ai");
    expect(focusLinks("pt-br", "security").primary).toBe("/pt-br/security");
  });
});

describe("app center links", () => {
  it("preserves every live href, grouping, and external target", () => {
    expect(allApps.map((app) => app.href)).toEqual(expectedHrefs);
    expect(appGroups.map((group) => group.apps.length)).toEqual([8, 5, 11, 2, 1, 5]);
    expect(allApps).toHaveLength(32);
    const lifeChurch = allApps.find((app) => app.href.endsWith("/life-church-tap/"));
    expect(lifeChurch?.groupId).toBe("tools");
    expect(allApps.filter((app) => app.external).map((app) => app.href)).toEqual([
      "https://www.etsy.com/listing/4582102485/biblical-pharmacy-educational-herb",
      "https://getgloballisting.com/Grokbot%20GGL/Get%20Global%20Listing/index.html",
      "https://meeting-translator-captions.onrender.com/",
      "https://fire-fellowship-captions.onrender.com/",
      "https://360show.vercel.app/",
      "https://party-requests-flax.vercel.app/r",
    ]);
  });
});

describe("contact mailto", () => {
  it("opens mail and does not claim a server send", () => {
    const href = buildMailto({
      name: "Ana",
      email: "ana@example.com",
      phone: "555",
      interest: "smart-home",
      message: "Need a doorbell",
    });
    expect(href.startsWith(`mailto:${site.email}?`)).toBe(true);
    expect(decodeURIComponent(href)).toContain("Website inquiry — Smart Home — Ana");
    expect(decodeURIComponent(href)).toContain("Need a doorbell");
    expect(href).not.toContain("https://");
  });

  it("validates required fields and keeps Smart Home as the default interest", () => {
    expect(parseInterest(undefined)).toBe("smart-home");
    expect(parseInterest("ai")).toBe("ai");
    expect(parseInterest("nope")).toBe("smart-home");
    const errors = validateContact(
      { name: "", email: "bad", phone: "", interest: "general", message: " " },
      en.form.errors,
    );
    expect(errors).toEqual({
      name: en.form.errors.name,
      email: en.form.errors.email,
      message: en.form.errors.message,
    });
  });
});

describe("translations and credentials", () => {
  it("keeps the same key structure in es and pt-br", () => {
    const english = keyPaths(en);
    expect(keyPaths(getDictionary("es"))).toEqual(english);
    expect(keyPaths(getDictionary("pt-br"))).toEqual(english);
    for (const locale of ["en", "es", "pt-br"] as const) {
      expect(stringsOf(getDictionary(locale)).every((item) => item.trim().length > 0)).toBe(true);
    }
  });

  it("states the owner-confirmed credentials without forbidden claims", () => {
    for (const locale of ["en", "es", "pt-br"] as const) {
      const text = stringsOf(getDictionary(locale)).join("\n");
      expect(text).toContain("Microsoft Certified Engineer");
      expect(text).toContain("Bachelor of Science in Information Systems Security");
      expect(text).toContain("Associate of Applied Science in Information Technology – Computer Network Systems");
      expect(text).toContain("Highest Honors");
      expect(text).toContain("3.8–4.0");
      expect(text).toContain("ITT Technical Institute");
      expect(text).toContain("Albuquerque");
      expect(text).toMatch(/Since 2004|Desde 2004/);
      expect(text).toContain("2500");
      expect(text).toContain(site.phone);
      expect(text).toContain(site.email);
      expect(text).toContain("1720 Alameda Dr");
      expect(text).toContain("$1,500–$2,000");
      expect(text).toContain("$2,500–$3,500");
      expect(text).toContain("$4,000–$5,500");
      expect(text.toLowerCase()).not.toContain("university of phoenix");
      expect(text).not.toMatch(/\bCEH\b|Certified Ethical Hacker|MCSE|CompTIA/);
      expect(text).not.toMatch(/\b\d+\s+years\b/i);
      expect(text).not.toMatch(/security clearance|Sergeant|deployed|34609/i);
      expect(text).not.toContain("Microsoft Certified Systems Engineer");
    }
    expect(en.credentials.items.bachelor.detail).toContain("ethical hacking");
    expect(en.credentials.items.bachelor.detail.toLowerCase()).toContain("one degree");
    expect(getDictionary("es").credentials.items.bachelor.detail).toContain("hacking ético");
    expect(getDictionary("es").credentials.items.bachelor.detail).toContain("ethical hacking");
    expect(getDictionary("pt-br").credentials.items.bachelor.detail).toContain("hacking ético");
    expect(getDictionary("pt-br").credentials.items.bachelor.detail).toContain("ethical hacking");
    expect(en.hero.copyStatus).toBe("proposed");
    expect(en.focus.ai.copyStatus).toBe("proposed");
    expect(en.form.interests.ai.copyStatus).toBe("proposed");
    expect(en.meta.home.copyStatus).toBe("proposed");
    expect(en.meta["app-center"].copyStatus).toBe("live");
    expect(en.credentials.copyStatus).toBe("owner-confirmed");
  });
});

describe("flag geometry and contrast", () => {
  it("draws 13 stripes and 50 stars in the official proportion", () => {
    const model = flagModel();
    expect(FLAG_VIEW.width / FLAG_VIEW.height).toBe(1.9);
    expect(model.stripes).toHaveLength(13);
    expect(model.stripes.filter((stripe) => stripe.color === FLAG_COLORS.red)).toHaveLength(7);
    expect(model.stripes[0].color).toBe(FLAG_COLORS.red);
    expect(model.stripes[12].color).toBe(FLAG_COLORS.red);
    expect(model.canton.width / FLAG_VIEW.height).toBeCloseTo(0.76);
    expect(model.canton.width / FLAG_VIEW.width).toBeCloseTo(0.4);
    expect(model.canton.height / FLAG_VIEW.height).toBeCloseTo(7 / 13);
    expect(model.stars).toHaveLength(50);
    expect(FLAG_COLORS).toEqual({ red: "#B22234", white: "#FFFFFF", blue: "#3C3B6E" });
    expect(starPoints(0, 0, 10).split(" ")).toHaveLength(10);
  });

  it("keeps the Bridge blue, gold, and ink pairs in the required contrast bands", () => {
    expect(contrast("#003B71", "#FFFFFF")).toBeGreaterThan(7);
    expect(contrast("#003B71", "#D4AF37")).toBeGreaterThan(4.5);
    expect(contrast("#002B52", "#FFFFFF")).toBeGreaterThan(7);
    expect(contrast("#002B52", "#D4AF37")).toBeGreaterThan(4.5);
    expect(contrast("#0B1F3A", "#D4AF37")).toBeGreaterThan(4.5);
    expect(contrast("#0B1F3A", "#E4C45C")).toBeGreaterThan(4.5);
    expect(contrast("#003B71", "#F4F6F8")).toBeGreaterThan(7);
    expect(contrast("#FFFFFF", "#D4AF37")).toBeLessThan(3);
    expect(en.hero.line2).toBe("Freddy Jara-Almonte");
    expect(en.hero.portraitAlt).toMatch(/not a military portrait/i);
    expect(en.hero.portraitAlt).not.toMatch(/placeholder/i);
    expect(getDictionary("es").hero.portraitAlt).toMatch(/no es un retrato militar/i);
    expect(getDictionary("pt-br").hero.portraitAlt).toMatch(/não é um retrato militar/i);
    for (const locale of ["en", "es", "pt-br"] as const) {
      const hero = JSON.stringify(getDictionary(locale).hero);
      expect(hero).not.toMatch(/Placeholder|provisional|provisória/i);
    }
  });
});

describe("app center stays a separate page", () => {
  const root = path.resolve(import.meta.dirname, "..");
  const marketingFiles = [
    "components/pages/HomePage.tsx",
    "components/pages/BusinessItPage.tsx",
    "components/pages/SmartHomePage.tsx",
    "components/pages/SecurityPage.tsx",
    "components/pages/ContactPage.tsx",
    "components/pages/PageIntro.tsx",
    "components/Footer.tsx",
    "components/ContactForm.tsx",
  ];

  it("keeps one header tab and no directory links on the marketing pages", () => {
    for (const file of marketingFiles) {
      const text = fs.readFileSync(path.join(root, file), "utf8");
      expect(text, file).not.toMatch(/app-center|appCenter/);
    }
    const header = fs.readFileSync(path.join(root, "components/Header.tsx"), "utf8");
    expect(header.match(/app-center/g)).toEqual(["app-center"]);
    expect(en.focus.ai.body).not.toMatch(/ordering demo|App Center|app-center/i);
    expect(getDictionary("es").focus.ai.body).not.toMatch(/demostración de pedidos|Centro de apps/i);
    expect(getDictionary("pt-br").focus.ai.body).not.toMatch(/demonstração de pedidos|Central de apps/i);
    const directory = fs.readFileSync(path.join(root, "components/pages/AppCenterPage.tsx"), "utf8");
    expect(directory).toContain("allApps");
    expect(directory).toContain("copy.back");
  });
});

describe("prices stay ranges", () => {
  it("matches the live smart home ranges", () => {
    expect(smartHomePackages.map((item) => item.price)).toEqual([
      "$1,500–$2,000",
      "$2,500–$3,500",
      "$4,000–$5,500",
    ]);
    expect(en.smartHome.disclaimer).toContain("Confirm before quoting");
  });
});
