import type { Locale } from "../routes";
import { en, type Dictionary } from "./en";
import es from "./es";
import ptBr from "./pt-br";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  es,
  "pt-br": ptBr,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
