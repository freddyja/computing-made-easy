import Link from "next/link";
import { en } from "@/lib/dictionary/en";
import es from "@/lib/dictionary/es";
import ptBr from "@/lib/dictionary/pt-br";

const copies = [en, es, ptBr];

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-5 py-24">
      {copies.map((copy) => (
        <section key={copy.htmlLang} lang={copy.htmlLang} className="mb-10">
          <h1 className="text-3xl font-semibold text-navy">{copy.notFound.title}</h1>
          <p className="mt-3 text-muted">{copy.notFound.body}</p>
          <Link href={copy.htmlLang === "en" ? "/" : copy.htmlLang === "es" ? "/es" : "/pt-br"} className="mt-4 inline-block font-semibold text-electric-deep">
            {copy.notFound.home}
          </Link>
        </section>
      ))}
    </main>
  );
}
