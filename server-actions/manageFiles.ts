"use server";

import {
  IResourceFileToUpload,
  IResourceUploadedResponse,
  SingleResourceFileType,
} from "@/models/models";

export const uploadOrganizationResourceFile = async (
  resourceFile: SingleResourceFileType
): Promise<IResourceUploadedResponse> => {
  const requestBody = {
    organizationId: resourceFile.organizationId,
    resourceType: resourceFile.resourceType,
    fileNameWithExtension: resourceFile.fileItem.fileNameWithExtension,
    fileContentInBase64: resourceFile.fileItem.fileContentInBase64,
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

export const uploadListOfOrganizationResourceFiles = async (
  resourceFiles: IResourceFileToUpload
) => {
  const { fileItems, organizationId, resourceType } = resourceFiles;

  return Promise.all(
    fileItems.map(async (fileItem) => {
      const resourceFile: SingleResourceFileType = {
        organizationId,
        resourceType,
        fileItem,
      };
      return uploadOrganizationResourceFile(resourceFile).then(
        (response) => response
      );
    })
  );
};
