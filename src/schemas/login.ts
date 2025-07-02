import { z } from "zod";

const errorMessages = {
  username: "نام‌کاربری نامعتبر است.",
  passwordRequired: "رمز عبور را وارد کنید.",
};

const schema = z.object({
  username: z.string().min(3, errorMessages.username),
  password: z.string().min(1, errorMessages.passwordRequired),
});

type schemaType = z.infer<typeof schema>;

export { schema, type schemaType };
