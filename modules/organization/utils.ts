import { Organization } from "@prisma/client";

export const getOrganizationsByCreator = async (
  creatorId: string,
  {
    pageParam,
  }: {
    pageParam: number;
  }
) => {
  const response = await fetch(
    `/api/creators/${creatorId}/organizations?page=${pageParam}`
  );
  const data = await response.json();
  return data as (Organization & {
    resourceFiles: { bucketKey: string }[];
  })[];
};
