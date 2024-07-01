import { IFileItem } from "@/models/models";

export const converFileToBase64 = (file: File) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const rawEncode = reader.result;
      const metaIndex = (rawEncode as string).indexOf(",");
      resolve((rawEncode as string).slice(metaIndex + 1));
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
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
