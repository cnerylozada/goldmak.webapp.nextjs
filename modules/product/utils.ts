import { Product } from "@prisma/client";

export const getProductsByOrganization = async (
  organizationId: string,
  {
    pageParam,
  }: {
    pageParam: number;
  }
) => {
  const response = await fetch(
    `/api/organizations/${organizationId}/products?page=${pageParam}`
  );
  const data = await response.json();
  return data as (Product & {
    resourceFiles: { bucketKey: string }[];
  })[];
};
