import { notFound } from "next/navigation";
import { AppCenterPage } from "@/components/pages/AppCenterPage";
import { getDictionary } from "@/lib/dictionary";
import { isLocale } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "app-center");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <AppCenterPage locale={locale} d={getDictionary(locale)} />;
}
