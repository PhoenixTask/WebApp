import { format } from "date-fns-jalali";
import { ConvertToFaNumber } from "./numberFormat";

// Date(Miladi) => "YYYY-MM-DD"(Miladi)
export function DateToString(date: Date): string {
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// "YYYY-MM-DD"(Miladi) => "YYYY/MM/DD"(Shamsi)
export function MiladiToShamsi(dateStr: string): string {
  const miladiDate = new Date(dateStr);
  const shamsiDate = format(miladiDate, "yyyy/MM/dd");

  return ConvertToFaNumber(shamsiDate);
}

// "M/DD/YYYY"(Miladi) => "YYYY-MM-DD"(Miladi)
export function ChangeFormStrDate(dateStr: string): string {
  const date = new Date(dateStr);

  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
