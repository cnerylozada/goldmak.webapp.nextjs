"use server";

import prisma from "@/prisma/client";

export const attachResourceFilesToOrganization = async (
  organizationId: string,
  resourcesUploadedList: { response: { objectURL: string } }[]
) => {
  const bucketKeysList = resourcesUploadedList.map((_) => ({
    bucketKey: _.response.objectURL,
  }));

  await prisma.organization.update({
    where: { id: organizationId },
    data: {
      resourceFiles: { create: bucketKeysList },
    },
  });
};
