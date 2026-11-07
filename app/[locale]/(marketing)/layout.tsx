import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/SiteFrame";
import { getDictionary } from "@/lib/dictionary";
import { isLocale } from "@/lib/routes";

export default async function MarketingLayout({
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
