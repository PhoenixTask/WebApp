import { localeType } from "@/i18n/locales";
import { z } from "zod";

const errorMessages = {
  en: {
    firstNameRequired: "First name is required.",
    lastNameRequired: "Last name is required.",
    emailRequired: "Email is required.",
    invalidEmail: "Invalid email.",
    username: "Invalid username.",
  },
  fa: {
    firstNameRequired: "نام را وارد کنید.",
    lastNameRequired: "نام خانوادگی را وارد کنید.",
    emailRequired: "وارد کردن ایمیل الزامی است.",
    invalidEmail: "ایمیل نامعتبر است.",
    username: "نام‌کاربری نامعتبر است.",
  },
};

export const getSchema = (locale: localeType) =>
  z.object({
    firstName: z
      .string()
      .min(1, { message: errorMessages[locale].firstNameRequired }),
    lastName: z
      .string()
      .min(1, { message: errorMessages[locale].lastNameRequired }),
    email: z
      .string()
      .min(1, { message: errorMessages[locale].emailRequired })
      .email({ message: errorMessages[locale].invalidEmail }),
    username: z.string().min(3, { message: errorMessages[locale].username }),
  });

export type schemaType = z.infer<ReturnType<typeof getSchema>>;
