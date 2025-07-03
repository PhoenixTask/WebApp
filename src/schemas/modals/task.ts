import { z } from "zod";

const errorMessages = {
  nameRequired: "نمی‌تونی عنوانی برای تسک مشخص نکنی!",
};

const schema = z.object({
  name: z.string().trim().min(1, errorMessages.nameRequired),
  description: z.string().trim().optional(),
  deadLine: z.string().trim(),
  priority: z.number(),
  order: z.number().optional(),
});

type schemaType = z.infer<typeof schema>;

export { schema, type schemaType };