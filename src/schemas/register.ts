import { localeType } from "@/i18n/locales";
import { z } from "zod";

const errorMessages = {
  en: {
    username: "Username must be at least 3 characters.",
    emailRequired: "Email is required.",
    invalidEmail: "Invalid email.",
    passwordSize: "Password must be at least 8 characters.",
    weakPassword: "Password must include letters and numbers.",
    confirmPassword: "Passwords do not match.",
  },
  fa: {
    username: "نام کاربری باید حداقل ۳ کاراکتر داشته باشد.",
    emailRequired: "وارد کردن ایمیل الزامی است.",
    invalidEmail: "ایمیل نامعتبر است.",
    passwordSize: "رمز عبور باید حداقل ۸ کاراکتر داشته باشد.",
    weakPassword: "رمزعبور باید شامل حرف و عدد باشد.",
    confirmPassword: "تکرار رمزعبور با رمزعبور مطابقت ندارد.",
  },
};

export const getSchema = (locale: localeType) =>
  z
    .object({
      username: z.string().min(3, { message: errorMessages[locale].username }),
      email: z
        .string()
        .min(1, { message: errorMessages[locale].emailRequired })
        .email({ message: errorMessages[locale].invalidEmail }),
      password: z
        .string()
        .min(8, { message: errorMessages[locale].passwordSize })
        .regex(/[a-zA-Z]/, { message: errorMessages[locale].weakPassword })
        .regex(/[0-9]/, { message: errorMessages[locale].weakPassword }),
      confirmPassword: z
        .string()
        .min(1, { message: errorMessages[locale].confirmPassword }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: errorMessages[locale].confirmPassword,
    });

export type schemaType = z.infer<ReturnType<typeof getSchema>>;
