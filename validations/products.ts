import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "It must be at least 3 chars")
    .max(10, "It must be at most 10 chars"),
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
