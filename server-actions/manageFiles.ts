"use server";

import { IResourceFileToUpload } from "@/models/models";

export const uploadOrganizationResourceFile = async (
  resourceFile: IResourceFileToUpload
) => {
  const requestBody = {
    organizationId: resourceFile.organizationId,
    resourceType: resourceFile.resourceType,
    fileNameWithExtension: resourceFile.fileNameWithExtension,
    fileContentInBase64: resourceFile.fileContentInBase64,
  };
  const query = await fetch(
    `${process.env.GOLDMAK_CLOUD_AWS_ENDPOINT}/resources/upload-file`,

    {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.GOLDMAK_MANAGEFILES_APIKEY}`,
      },
    }
  );
  const response = await query.json();
  return response;
};
