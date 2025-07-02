import { z } from "zod";

const errorMessages = {
  username: "نام کاربری باید حداقل ۳ کاراکتر داشته باشد.",
  emailRequired: "وارد کردن ایمیل الزامی است.",
  invalidEmail: "ایمیل نامعتبر است.",
  passwordSize: "رمز عبور باید حداقل ۸ کاراکتر داشته باشد.",
  weekPassword: "رمزعبور باید شامل حرف و عدد باشد.",
  confirmPassword: "تکرار رمزعبور با رمزعبور مطابقت ندارد.",
};

const schema = z
  .object({
    username: z.string().min(3, errorMessages.username),
    email: z
      .string()
      .min(1, errorMessages.emailRequired)
      .email(errorMessages.invalidEmail),
    password: z
      .string()
      .min(8, errorMessages.passwordSize)
      .regex(/[a-zA-Z]/, errorMessages.weekPassword)
      .regex(/[0-9]/, errorMessages.weekPassword),
    confirmPassword: z.string().min(1, errorMessages.confirmPassword),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: errorMessages.confirmPassword,
  });

type schemaType = z.infer<typeof schema>;

export { schema, type schemaType };
