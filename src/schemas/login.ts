import { localeType } from "@/i18n/locales";
import { z } from "zod";

const errorMessages = {
  en: {
    username: "Invalid username.",
    passwordRequired: "Password is required.",
  },
  fa: {
    username: "نام‌کاربری نامعتبر است.",
    passwordRequired: "رمز عبور را وارد کنید.",
  },
};

export const getSchema = (locale: localeType) =>
  z.object({
    username: z.string().min(3, { message: errorMessages[locale].username }),
    password: z
      .string()
      .min(1, { message: errorMessages[locale].passwordRequired }),
  });

export type schemaType = z.infer<ReturnType<typeof getSchema>>;
