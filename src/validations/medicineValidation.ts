import { z } from "zod";

export const medicineSchema = z.object({
  name: z.string().min(2, "Medicine name required"),
  description: z.string().min(5),
  price: z.number().positive(),
  stock: z.number().int().min(1),
  categoryId: z.string(),
});
