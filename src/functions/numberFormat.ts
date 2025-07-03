export function ConvertToFaNumber(enDigit: string): string {
  const FaDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return enDigit.replace(/\d/g, (d) => FaDigits[parseInt(d)]);
}
