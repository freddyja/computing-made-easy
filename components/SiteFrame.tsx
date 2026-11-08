import type { Dictionary } from "@/lib/dictionary";
import { htmlLang, type Locale } from "@/lib/routes";
import { DocumentLang } from "./DocumentLang";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileCallBar } from "./MobileCallBar";
import { MotionRoot } from "./MotionRoot";

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
    <div lang={htmlLang(locale)} className="contents">
      <DocumentLang lang={htmlLang(locale)} />
      <MotionRoot />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-navy focus:outline-navy"
      >
        {d.skip}
      </a>
      <Header locale={locale} d={d} />
      <main id="main" className="flex-1 pb-16 md:pb-0">
        {children}
      </main>
      <Footer locale={locale} d={d} />
      <MobileCallBar d={d} />
    </div>
  );
}
