export const locales = ["en", "fa"] as const;
export type localeType = (typeof locales)[number];

export const languages: Record<string, string> = {
  fa: "فارسی",
  en: "English",
};

export const timeZones: Record<localeType, string> = {
  fa: "Asia/Tehran",
  en: "UTC",
};
