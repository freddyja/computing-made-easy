import { notFound } from "next/navigation";
import { HomePage } from "@/components/pages/HomePage";
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
  return buildMetadata(locale, "home");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} d={getDictionary(locale)} />;
}
