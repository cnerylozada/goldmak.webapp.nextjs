"use server";

import { IResourceUploadedResponse } from "@/models/models";
import prisma from "@/prisma/client";

export const attachResourceFilesToOrganization = async (
  organizationId: string,
  resourcesUploadedList: IResourceUploadedResponse[]
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
