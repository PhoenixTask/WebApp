import { localeType } from "@/i18n/locales";
import { z } from "zod";

const errorMessages = {
  en: {
    nameRequired: "You must provide a name for the project!",
  },
  fa: {
    nameRequired: "نمی‌تونی نامی برای پروژه مشخص نکنی!",
  },
};

export const getSchema = (locale: localeType) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: errorMessages[locale].nameRequired }),
    color: z.string(),
  });

export type schemaType = z.infer<ReturnType<typeof getSchema>>;
