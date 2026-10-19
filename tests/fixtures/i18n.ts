import { createTranslator } from "next-intl";
import id from "../../src/messages/id.json";
import en from "../../src/messages/en.json";

export async function getTestTranslations(options: { locale?: string; namespace?: keyof typeof id } | keyof typeof id) {
  const locale = typeof options === "string" ? "id" : options.locale ?? "id";
  return createTranslator({
    locale,
    messages: locale === "id" ? id : en,
    namespace: typeof options === "string" ? options : options.namespace,
    onError: (error) => { throw error; },
  });
}
