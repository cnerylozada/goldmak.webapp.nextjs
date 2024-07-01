import { z } from "zod";

export const organizationSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type OrganizationType = z.infer<typeof organizationSchema>;
