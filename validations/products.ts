import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "It must be at least 3 chars")
    .max(10, "It must be at most 10 chars"),
  price: z.string().min(3).max(10),
});

export type ProductType = z.infer<typeof productSchema>;
