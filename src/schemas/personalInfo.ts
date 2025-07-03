import { z } from "zod";

const errorMessages = {
  emailRequired: "وارد کردن ایمیل الزامی است.",
  invalidEmail: "ایمیل نامعتبر است.",
  firstNameRequired: "نام را وارد کنید.",
  lastNameRequired: "نام خانوادگی را وارد کنید.",
};

const schema = z.object({
  firstName: z.string().min(1, errorMessages.firstNameRequired),
  lastName: z.string().min(1, errorMessages.lastNameRequired),
  email: z
    .string()
    .min(1, errorMessages.emailRequired)
    .email(errorMessages.invalidEmail),
});

type schemaType = z.infer<typeof schema>;

export { schema, type schemaType };
