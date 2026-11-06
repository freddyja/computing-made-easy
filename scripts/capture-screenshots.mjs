import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const base = process.env.BASE_URL || "http://127.0.0.1:3456";
const outDir = process.env.OUT_DIR || "/opt/cursor/artifacts";
fs.mkdirSync(outDir, { recursive: true });

const shots = [
  { name: "screenshot_home_desktop", path: "/", width: 1440, height: 900, fullPage: false },
  { name: "screenshot_home_desktop_full", path: "/", width: 1440, height: 900, fullPage: true },
  { name: "screenshot_home_tablet", path: "/", width: 768, height: 1024, fullPage: false },
  { name: "screenshot_home_mobile", path: "/", width: 390, height: 844, fullPage: false },
  { name: "screenshot_home_mobile_full", path: "/", width: 390, height: 844, fullPage: true },
  { name: "screenshot_smart_home_desktop", path: "/smart-home", width: 1440, height: 900, fullPage: false },
  { name: "screenshot_smart_home_mobile", path: "/smart-home", width: 390, height: 844, fullPage: false },
  { name: "screenshot_contact_desktop", path: "/contact", width: 1440, height: 900, fullPage: false },
  { name: "screenshot_contact_mobile", path: "/contact", width: 390, height: 844, fullPage: true },
  { name: "screenshot_security_desktop", path: "/security", width: 1440, height: 900, fullPage: false },
  { name: "screenshot_app_center_desktop", path: "/app-center", width: 1440, height: 900, fullPage: false },
  { name: "screenshot_home_es_desktop", path: "/es", width: 1440, height: 900, fullPage: false },
  { name: "screenshot_home_pt_mobile", path: "/pt-br", width: 390, height: 844, fullPage: false },
];

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const report = { base, checks: [], shots: [] };

try {
  for (const shot of shots) {
    const page = await browser.newPage();
    await page.setViewport({ width: shot.width, height: shot.height, deviceScaleFactor: 1 });
    const response = await page.goto(`${base}${shot.path}`, { waitUntil: "networkidle0", timeout: 60000 });
    const file = path.join(outDir, `${shot.name}.png`);
    await page.screenshot({ path: file, fullPage: shot.fullPage });
    const facts = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      h1: document.querySelector("h1")?.innerText || "",
      flag: document.querySelectorAll("svg polygon").length,
      tel: [...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute("href")),
      mailto: [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute("href")),
      status: document.querySelector("[data-copy-status]")?.getAttribute("data-copy-status") || "",
    }));
    report.shots.push({ ...shot, status: response?.status(), file, facts });
    await page.close();
  }

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`${base}/contact`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.querySelector('button[type="submit"]')?.scrollIntoView({ block: "center" }));
  await page.click('button[type="submit"]');
  await page.waitForSelector('[role="alert"]', { timeout: 5000 });
  const errors = await page.evaluate(() => ({
    alert: document.querySelector('[role="alert"]')?.textContent || "",
    invalid: [...document.querySelectorAll("[aria-invalid='true']")].map((el) => el.getAttribute("name")),
    note: document.querySelector("#mailto-note")?.textContent || "",
  }));
  const formFile = path.join(outDir, "screenshot_contact_mobile_validation.png");
  await page.screenshot({ path: formFile, fullPage: true });
  report.checks.push({ name: "form-validation", errors, file: formFile });

  await page.keyboard.press("Tab");
  const focus1 = await page.evaluate(() => document.activeElement?.tagName + ":" + (document.activeElement?.getAttribute("name") || document.activeElement?.textContent || "").slice(0, 40));
  report.checks.push({ name: "tab-after-validation", focus: focus1 });

  await page.goto(`${base}/`, { waitUntil: "networkidle0" });
  await page.setViewport({ width: 390, height: 844 });
  await page.click('button[aria-controls]');
  await page.waitForSelector("#" + (await page.$eval('button[aria-controls]', (el) => el.getAttribute("aria-controls"))));
  const menuFile = path.join(outDir, "screenshot_home_mobile_menu.png");
  await page.screenshot({ path: menuFile });
  const expanded = await page.$eval('button[aria-controls]', (el) => el.getAttribute("aria-expanded"));
  await page.keyboard.press("Escape");
  const closed = await page.$eval('button[aria-controls]', (el) => el.getAttribute("aria-expanded"));
  report.checks.push({ name: "mobile-menu", expanded, closed, file: menuFile });

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${base}/es/business-it`, { waitUntil: "networkidle0" });
  const esBiz = path.join(outDir, "screenshot_business_it_es_desktop.png");
  await page.screenshot({ path: esBiz });
  const esFacts = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    h1: document.querySelector("h1")?.innerText || "",
    hrefs: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).slice(0, 20),
  }));
  report.checks.push({ name: "es-business-it", esFacts, file: esBiz });
} finally {
  await browser.close();
}

fs.writeFileSync(path.join(outDir, "screenshot_report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
