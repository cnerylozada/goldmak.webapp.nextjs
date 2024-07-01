export interface IBaseOrganizationCreationDto {
  name: string;
  description: string;
  creatorId: string;
}

export type resourceType = "organization" | "product";

export interface IFileItem {
  fileNameWithExtension: string;
  fileContentInBase64: string;
}

export interface IResourceFileToUpload {
  organizationId: string;
  resourceType: resourceType;
  fileItems: IFileItem[];
}
export type SingleResourceFileType = Omit<
  IResourceFileToUpload,
  "fileItems"
> & {
  fileItem: IFileItem;
};
