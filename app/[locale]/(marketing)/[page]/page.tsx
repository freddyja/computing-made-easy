import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { BusinessItPage } from "@/components/pages/BusinessItPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { SecurityPage } from "@/components/pages/SecurityPage";
import { SmartHomePage } from "@/components/pages/SmartHomePage";
import { getDictionary } from "@/lib/dictionary";
import {
  isLocale,
  isMarketingPage,
  marketingPages,
  type Locale,
  type MarketingPage,
} from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

const views: Record<
  MarketingPage,
  (props: { locale: Locale; d: ReturnType<typeof getDictionary>; interest?: string }) => ReactNode
> = {
  "business-it": BusinessItPage,
  "smart-home": SmartHomePage,
  security: SecurityPage,
  contact: ContactPage,
};

export function generateStaticParams() {
  return ["en", "es", "pt-br"].flatMap((locale) =>
    marketingPages.map((page) => ({ locale, page })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const { locale, page } = await params;
  if (!isLocale(locale) || !isMarketingPage(page)) return {};
  return buildMetadata(locale, page);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const { locale, page } = await params;
  if (!isLocale(locale) || !isMarketingPage(page)) notFound();
  const View = views[page];
  return <View locale={locale} d={getDictionary(locale)} />;
}
