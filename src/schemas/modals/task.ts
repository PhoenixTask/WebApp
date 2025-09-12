import { localeType } from "@/i18n/locales";
import { z } from "zod";

const errorMessages = {
  en: {
    nameRequired: "You must provide a title for the task!",
    deadLineRequired: "You must provide a deadline for the task!",
  },
  fa: {
    nameRequired: "نمی‌تونی عنوانی برای تسک مشخص نکنی!",
    deadLineRequired: "نمی‌تونی تاریخی رو برای تسک مشخص نکنی!",
  },
};

export const getSchema = (locale: localeType) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: errorMessages[locale].nameRequired }),
    description: z.string().trim().optional(),
    deadLine: z
      .string()
      .trim()
      .min(1, { message: errorMessages[locale].deadLineRequired }),
    priority: z.number(),
    order: z.number().optional(),
  });

export type schemaType = z.infer<ReturnType<typeof getSchema>>;
