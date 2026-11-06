import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/routes";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileCallBar } from "./MobileCallBar";

export function SiteFrame({
  locale,
  d,
  children,
}: {
  locale: Locale;
  d: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        {d.skip}
      </a>
      <Header locale={locale} d={d} />
      <main id="main" className="flex-1 pb-16 md:pb-0">
        {children}
      </main>
      <Footer locale={locale} d={d} />
      <MobileCallBar d={d} />
    </>
  );
}
