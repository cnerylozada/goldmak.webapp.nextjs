import { IFileItem } from "@/models/models";

export const converFileToBase64 = (file: File) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });

export const mapAcceptedFilesToResourcesToUpload = (files: File[]) => {
  return Promise.all(
    files.map(async (_) => {
      return converFileToBase64(_).then((result) => {
        return {
          fileContentInBase64: result,
          fileNameWithExtension: _.name,
        } as IFileItem;
      });
    })
  );
};
