import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { AppCenterPage } from "@/components/pages/AppCenterPage";
import { BusinessItPage } from "@/components/pages/BusinessItPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { SecurityPage } from "@/components/pages/SecurityPage";
import { SmartHomePage } from "@/components/pages/SmartHomePage";
import { getDictionary } from "@/lib/dictionary";
import { contentPages, isLocale, isPage, type ContentPage, type Locale } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

const views: Record<
  ContentPage,
  (props: { locale: Locale; d: ReturnType<typeof getDictionary>; interest?: string }) => ReactNode
> = {
  "business-it": BusinessItPage,
  "smart-home": SmartHomePage,
  security: SecurityPage,
  contact: ContactPage,
  "app-center": AppCenterPage,
};

export function generateStaticParams() {
  return ["en", "es", "pt-br"].flatMap((locale) =>
    contentPages.map((page) => ({ locale, page })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const { locale, page } = await params;
  if (!isLocale(locale) || !isPage(page)) return {};
  return buildMetadata(locale, page);
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; page: string }>;
  searchParams: Promise<{ interest?: string }>;
}) {
  const { locale, page } = await params;
  if (!isLocale(locale) || !isPage(page)) notFound();
  const query = await searchParams;
  const View = views[page];
  return <View locale={locale} d={getDictionary(locale)} interest={query.interest} />;
}
