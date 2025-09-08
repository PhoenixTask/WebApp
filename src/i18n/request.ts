import { getRequestConfig } from "next-intl/server";
import { localeType, timeZones } from "./locales";
import { routing } from "./routing";

async function loadMessages(
  locale: localeType
): Promise<Record<string, string>> {
  try {
    const messages: Record<string, string> = (
      await import(`../messages/${locale}.json`)
    ).default;
    return messages;
  } catch {
    console.warn(
      `Failed to load messages for locale "${locale}", falling back to "${routing.defaultLocale}"`
    );
    const defaultMessages: Record<string, string> = (
      await import(`../messages/${routing.defaultLocale}.json`)
    ).default;
    return defaultMessages;
  }
}

function resolveLocale(locale?: string): localeType {
  if (locale && routing.locales.includes(locale as localeType)) {
    return locale as localeType;
  }
  return routing.defaultLocale;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = resolveLocale(await requestLocale);
  const messages = await loadMessages(locale);
  const timeZone = timeZones[locale] ?? "UTC";

  return { locale, messages, timeZone };
});
