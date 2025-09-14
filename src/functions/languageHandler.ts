export function direction(locale: string) {
  const directions: Record<string, "rtl" | "ltr"> = {
    fa: "rtl",
    en: "ltr",
  };

  return {
    dir: directions[locale] ?? "ltr",
  };
}

// 123 => ۱۲۳
export function ConvertToFaNumber(enDigit: string): string {
  const FaDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return enDigit.replace(/\d/g, (d) => FaDigits[parseInt(d)]);
}

export function getLocale() {
  if (typeof window === "undefined") return "en";
  const locale = window.location.pathname.split("/")[1];
  return locale === "fa" ? "fa" : "en";
}
