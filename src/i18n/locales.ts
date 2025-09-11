export const locales = ["en", "fa"] as const;
export type localeType = (typeof locales)[number];

export const localeSet = new Set(locales);

export const languages = {
  fa: { name: "فارسی", timeZone: "Asia/Tehran" },
  en: { name: "English", timeZone: "UTC" },
} as const;

export const timeZones: Record<localeType, string> = {
  fa: "Asia/Tehran",
  en: "UTC",
};
