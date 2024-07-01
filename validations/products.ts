import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Name must have 20 chars at most"),
  description: z.string().min(1, "Description is required"),
  price: z.custom(
    (_) => {
      return (
        !!_ &&
        !isNaN(_.toString()) &&
        (/^0(?:[.]\d{1,2})?$/.test(_.toString()) ||
          /^([1-9]+)(?:[.]\d{1,2})?$/.test(_.toString()))
      );
    },
    { message: "It must be a valid number with 2 decimals places" }
  ),
  stock: z.coerce
    .number({ invalid_type_error: "Only integers amount" })
    .int()
    .gte(1, "At least 1"),
});

export type ProductType = z.infer<typeof productSchema>;
