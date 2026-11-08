import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getDictionary } from "../lib/dictionary";
import { motionEnabled, motionTiming } from "../lib/motion";
import { interpretSubmitResponse, submitContact } from "../lib/submit";

const root = path.resolve(import.meta.dirname, "..");

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

describe("contact delivery states", () => {
  const messages = getDictionary("en").form.errors;
  const input = {
    name: "Ana",
    email: "ana@example.com",
    phone: "555",
    interest: "smart-home",
    message: "Need a doorbell",
  };

  it("shows success only when the server marks the message delivered", async () => {
    const delivered = await submitContact(input, "", messages, async () => ({
      status: 200,
      body: { ok: true, delivered: true },
    }));
    expect(delivered).toEqual({ ok: true, delivered: true });
    expect(interpretSubmitResponse(200, { ok: true })).toEqual({ ok: false, code: "unconfigured" });
    expect(interpretSubmitResponse(503, { ok: false, code: "unconfigured" })).toEqual({
      ok: false,
      code: "unconfigured",
    });
    expect(interpretSubmitResponse(200, null)).toEqual({ ok: false, code: "unconfigured" });
    expect(interpretSubmitResponse(502, { ok: false, code: "error" }).ok).toBe(false);
  });

  it("rejects a honeypot and does not call the transport", async () => {
    let called = false;
    const result = await submitContact(input, "https://spam.example", messages, async () => {
      called = true;
      return { status: 200, body: { ok: true, delivered: true } };
    });
    expect(called).toBe(false);
    expect(result).toEqual({ ok: false, code: "rejected" });
  });

  it("keeps the form from treating mailto as a successful send", () => {
    const form = fs.readFileSync(path.join(root, "components/ContactForm.tsx"), "utf8");
    expect(form).not.toContain("window.location.href");
    expect(form).toContain('phase === "success"');
    expect(form).toContain("d.form.unconfigured");
    expect(form).toContain("mailtoFallback");
    const php = fs.readFileSync(path.join(root, "public/contact-submit.php"), "utf8");
    expect(php).toContain("'delivered' => true");
    expect(php).toContain("unconfigured");
    expect(php).not.toMatch(/password\s*=>\s*'[^']+'/);
  });
});

describe("motion and readable figures", () => {
  it("reveals only when motion and an observer are both available", () => {
    expect(motionEnabled(false, true)).toBe(true);
    expect(motionEnabled(true, true)).toBe(false);
    expect(motionEnabled(false, false)).toBe(false);
    expect(motionTiming.hoverMs).toBe(240);
    expect(motionTiming.revealMs).toBe(520);
    const css = fs.readFileSync(path.join(root, "app/globals.css"), "utf8");
    expect(css).toContain(".cme-reveal {\n  opacity: 1;");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain("scripting: none");
    expect(css).toContain("translateY(-4px)");
    expect(css).toContain("translateY(12px)");
    const count = fs.readFileSync(path.join(root, "components/CountUp.tsx"), "utf8");
    expect(count).toContain("data-count-final={finalText}");
    expect(count).toContain("useState(finalText)");
  });

  it("labels example slides as placeholders in every locale", () => {
    for (const locale of ["en", "es", "pt-br"] as const) {
      const copy = getDictionary(locale).testimonials;
      expect(copy.copyStatus).toBe("design-review");
      expect(copy.notice.toLowerCase()).toMatch(/not |não |no son|no es|não são|não tem|no tiene/);
      expect(copy.slides.length).toBeGreaterThan(1);
      for (const slide of copy.slides) {
        expect(slide.kicker.length).toBeGreaterThan(0);
        expect(slide.attribution.toLowerCase()).not.toMatch(/john|jane|smith|5 stars|★★★★★/);
      }
    }
    const home = fs.readFileSync(path.join(root, "components/pages/HomePage.tsx"), "utf8");
    expect(home).toContain('target="2004"');
    expect(home).toContain('target="2500"');
    expect(home).not.toMatch(/app-center|appCenter/);
  });

  it("keeps new colored text pairs above the body-text contrast floor", () => {
    expect(contrast("#6B4F00", "#FFFFFF")).toBeGreaterThan(4.5);
    expect(contrast("#6B4F00", "#E7EEF5")).toBeGreaterThan(4.5);
    expect(contrast("#6B4F00", "#FFF8E6")).toBeGreaterThan(4.5);
    expect(contrast("#0B1F3A", "#FFF8E6")).toBeGreaterThan(7);
    expect(contrast("#003B71", "#FFFFFF")).toBeGreaterThan(7);
  });
});
