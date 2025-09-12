import { localeType } from "@/i18n/locales";
import { useTranslations, useLocale } from "next-intl";

export function useSchema(getSchema: any, translationKey?: string) {
  const locale = useLocale() as localeType;
  const t = translationKey
    ? useTranslations(translationKey)
    : useTranslations();
  const schema = getSchema(locale);

  return { t, locale, schema };
}
