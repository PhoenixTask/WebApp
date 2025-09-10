export function direction(locale: string) {
  const directions: Record<string, "rtl" | "ltr"> = {
    fa: "rtl",
    en: "ltr",
  };

  return {
    dir: directions[locale] ?? "ltr",
  };
}
