type resourceType = "organization" | "product";

export interface IResourceFileToUpload {
  organizationId: string;
  resourceType: resourceType;
  fileNameWithExtension: string;
  fileContentInBase64: string;
}
