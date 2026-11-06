"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionary";
import { site } from "@/lib/site";
import {
  isHomePath,
  locales,
  publicHref,
  switchLocale,
  type Locale,
  type PageId,
} from "@/lib/routes";
import { Button } from "./Button";
import { Flag } from "./Flag";
import { Logo } from "./Logo";

const links: { page: PageId; key: "businessIt" | "smartHome" | "security" | "appCenter" }[] = [
  { page: "business-it", key: "businessIt" },
  { page: "smart-home", key: "smartHome" },
  { page: "security", key: "security" },
  { page: "app-center", key: "appCenter" },
];

export function Header({ locale, d }: { locale: Locale; d: Dictionary }) {
  const pathname = usePathname() || "/";
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const home = isHomePath(pathname);

  function closeMenu(restoreFocus = false) {
    setOpenPath(null);
    if (restoreFocus) buttonRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>("a[href]");
    focusable?.[0]?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu(true);
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function toggleMenu() {
    setOpenPath(open ? null : pathname);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo
          href={publicHref(locale, "home")}
          name={site.name}
          sub={site.smartHomeBrand}
        />
        <nav className="hidden items-center gap-1 lg:flex" aria-label={d.nav.explore}>
          {links.map((link) => {
            const href = publicHref(locale, link.page);
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={link.page}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`px-3 py-2 text-sm font-semibold ${
                  active ? "text-navy underline decoration-2 underline-offset-8" : "text-navy/75 hover:text-navy"
                }`}
              >
                {d.nav[link.key]}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher locale={locale} pathname={pathname} d={d} />
          <Button href={publicHref(locale, "contact")}>{d.nav.quote}</Button>
        </div>
        <button
          ref={buttonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-line text-navy lg:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? d.closeMenu : d.openMenu}
          onClick={toggleMenu}
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {open ? "×" : "☰"}
          </span>
        </button>
      </div>
      {open && (
        <div
          id={panelId}
          ref={panelRef}
          className="border-t border-line bg-white px-5 py-4 lg:hidden"
        >
          <nav className="flex flex-col" aria-label={d.nav.explore}>
            {links.map((link) => (
              <Link
                key={link.page}
                href={publicHref(locale, link.page)}
                className="border-b border-line py-3 text-lg font-semibold text-navy"
              >
                {d.nav[link.key]}
              </Link>
            ))}
            <Link
              href={publicHref(locale, "contact")}
              className="border-b border-line py-3 text-lg font-semibold text-navy"
            >
              {d.nav.contact}
            </Link>
            <a href={`tel:${site.phoneTel}`} className="py-3 text-lg font-semibold text-electric-deep">
              {d.callBar}
            </a>
          </nav>
          <div className="mt-4">
            <LanguageSwitcher locale={locale} pathname={pathname} d={d} />
          </div>
        </div>
      )}
      {!home && (
        <div className="border-t border-line bg-paper">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
            <div className="w-28 shrink-0 border border-navy/15 bg-white p-1 sm:w-40">
              <Flag title={d.flag.title} />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy sm:text-base">{d.identity.line}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {d.identity.since} · {d.identity.veteran}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function LanguageSwitcher({
  locale,
  pathname,
  d,
}: {
  locale: Locale;
  pathname: string;
  d: Dictionary;
}) {
  return (
    <nav aria-label={d.languageLabel} className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em]">
      {locales.map((item) => {
        const current = item === locale;
        return (
          <Link
            key={item}
            href={switchLocale(pathname, item)}
            hrefLang={item === "pt-br" ? "pt-BR" : item}
            lang={item === "pt-br" ? "pt-BR" : item}
            aria-current={current ? "true" : undefined}
            className={`px-2 py-2 ${current ? "bg-navy text-white" : "text-navy hover:bg-paper"}`}
          >
            {item === "pt-br" ? "PT" : item.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
