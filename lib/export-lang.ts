/** Document language for a path inside the static export. */
export function exportHtmlLang(relativePath: string): "en" | "es" | "pt-BR" | null {
  const norm = relativePath.replaceAll("\\", "/").replace(/^\/+/, "");
  const head = norm.split("/")[0];
  if (head === "es") return "es";
  if (head === "pt-br") return "pt-BR";
  if (head === "en") return "en";
  return null;
}

export function setDocumentLang(html: string, lang: string): string {
  return html.replace(/<html\b([^>]*?)\slang="[^"]*"/, `<html$1 lang="${lang}"`);
}
