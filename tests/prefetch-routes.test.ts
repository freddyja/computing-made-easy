import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { rewriteMarketingRequest } from "../lib/marketing-rewrite";
import { preservedAppPaths } from "../lib/preserved-apps";

const outDir = path.resolve(import.meta.dirname, "../out");

function publicPathForExport(relative: string): string {
  const parts = relative.split("/");
  const locale = parts[0];
  const rest = parts.slice(1);
  if (locale === "en") return `/${rest.join("/")}`.replace(/\/$/, "") || "/";
  return `/${relative}`.replace(/\/$/, "");
}

describe("static prefetch files survive the live Apache rules", () => {
  it("maps every exported __next text file to that file and leaves app URLs to WordPress", () => {
    const files = walk(outDir).filter(
      (file) => file.includes("__next.") && file.endsWith(".txt") && !file.startsWith("_not-found/"),
    );
    expect(files.length).toBeGreaterThan(20);
    for (const relative of files) {
      const request = `${publicPathForExport(relative)}?_rsc=test`;
      const result = rewriteMarketingRequest(request);
      expect(result.action, relative).toBe("rewrite");
      if (result.action !== "rewrite") continue;
      const disk = path.join(outDir, result.to.replace(/^\/cme-static\//, ""));
      expect(fs.existsSync(disk), result.to).toBe(true);
      const body = fs.readFileSync(disk, "utf8");
      expect(body.startsWith("<!DOCTYPE"), relative).toBe(false);
      expect(body.includes("<html"), relative).toBe(false);
      expect(body.length, relative).toBeGreaterThan(20);
    }

    for (const observed of [
      "/__next._tree.txt?_rsc=abc",
      "/business-it/__next._tree.txt",
      "/smart-home/__next._tree.txt",
      "/security/__next._tree.txt",
      "/contact/__next._tree.txt",
      "/es/__next._tree.txt",
      "/pt-br/__next._tree.txt",
    ]) {
      const result = rewriteMarketingRequest(observed);
      expect(result.action, observed).toBe("rewrite");
    }

    for (const app of preservedAppPaths) {
      expect(rewriteMarketingRequest(`/${app}/`).action).toBe("wordpress");
      expect(rewriteMarketingRequest(`/${app}/__next._tree.txt`).action).toBe("wordpress");
    }
    expect(rewriteMarketingRequest("/wp-admin/").action).toBe("wordpress");
    expect(rewriteMarketingRequest("/wp-json/wp/v2/pages").action).toBe("wordpress");
    expect(rewriteMarketingRequest("/biblical-pharmacy/").action).toBe("wordpress");
  });
});

function walk(dir: string, prefix = ""): string[] {
  const found: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) found.push(...walk(path.join(dir, entry.name), rel));
    else found.push(rel);
  }
  return found;
}
