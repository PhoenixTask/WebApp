import { z } from "zod";

const errorMessages = {
  nameRequired: "نمی‌تونی نامی برای ستون مشخص نکنی!",
};

const schema = z.object({
  name: z.string().trim().min(1, errorMessages.nameRequired),
  color: z.string(),
});

type schemaType = z.infer<typeof schema>;

export { schema, type schemaType };