import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/SiteFrame";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, locales } from "@/lib/routes";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <SiteFrame locale={locale} d={getDictionary(locale)}>
      {children}
    </SiteFrame>
  );
}
