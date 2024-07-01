import { z } from "zod";

export const organizationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Name must have 20 chars at most"),
  description: z.string().min(1, "Description is required"),
});

export type OrganizationSchemaType = z.infer<typeof organizationSchema>;
