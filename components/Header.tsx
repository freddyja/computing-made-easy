"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, site } from "@/lib/site";
import { Button } from "./Button";
import { CloseIcon, LogoMark, MenuIcon } from "./icons";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy/5 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
          onClick={() => setOpen(false)}
        >
          <LogoMark className="h-8 w-8 shrink-0" />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-navy sm:text-base">
              {site.name}
            </span>
            <span className="hidden text-[11px] font-medium text-electric sm:block">
              {site.smartHomeBrand}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-electric underline decoration-2 underline-offset-8"
                    : "text-navy/80 hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/contact" className="hidden sm:inline-flex">
            Free quote →
          </Button>
          <Button href="/contact" className="sm:hidden px-3 py-2 text-xs">
            Free quote
          </Button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-navy md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-navy/5 bg-white px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-navy hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${site.phoneTel}`}
              className="rounded-lg px-3 py-3 text-base font-semibold text-electric"
              onClick={() => setOpen(false)}
            >
              Call {site.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
