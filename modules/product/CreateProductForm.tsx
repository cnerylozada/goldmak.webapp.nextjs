"use client";
import { IResourceFileToUpload } from "@/models/models";
import {
  uploadListOfOrganizationResourceFiles,
  uploadOrganizationResourceFile,
} from "@/server-actions/manageFiles";
import {
  converFileToBase64,
  mapAcceptedFilesToResourcesToUpload,
} from "@/utils/utils";
import { ProductType, productSchema } from "@/validations/products";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm, SubmitHandler } from "react-hook-form";

export const CreateProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ProductType>({
    mode: "all",
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    reset({ name: "samsung", stock: 1, price: 45.69 });
  }, []);

  const [userAcceptedFiles, setUserAcceptedFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUserAcceptedFiles((_) => [..._, ...acceptedFiles]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "image/png": [".png", ".jpg", ".jpeg"],
      },
      maxFiles: 3,
      maxSize: 250000,
    });
  const fileRejectionItems = fileRejections.map(({ file, errors }, index) => {
    return (
      <div key={index} className="text-red-600">
        {file.name} - {file.size * 0.001} KB
        <div>
          {errors.map((e) => (
            <div key={e.code}>{e.message}</div>
          ))}
        </div>
      </div>
    );
  });

  const onSubmit: SubmitHandler<ProductType> = async (data) => {
    const product = { ...data, price: +data.price };

    const fileItems = await mapAcceptedFilesToResourcesToUpload(
      userAcceptedFiles
    );
    const resourceFile: IResourceFileToUpload = {
      organizationId: "1",
      resourceType: "product",
      fileItems,
    };
    const response = await uploadListOfOrganizationResourceFiles(resourceFile);
    console.log(response);
  };

  return (
    <div>
      <div>CreateProductForm</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        {errors.name && <div>{errors.name.message}</div>}

        <input {...register("price")} />
        {errors.price && <div>{errors.price.message as string}</div>}

        <input type="number" {...register("stock")} />
        {errors.stock && <div>{errors.stock.message}</div>}

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>

        <div>
          {!!userAcceptedFiles.length &&
            userAcceptedFiles.map((_, index) => (
              <div key={index}>
                <div> size: {_.size * 0.001} KB</div>
                <div>
                  <button
                    onClick={() => {
                      setUserAcceptedFiles((files) =>
                        files.filter((item, itemIndex) => itemIndex !== index)
                      );
                    }}
                  >
                    Remove
                  </button>
                </div>
                <Image
                  src={URL.createObjectURL(_)}
                  alt={URL.createObjectURL(_)}
                  width={100}
                  height={100}
                />
              </div>
            ))}

          {fileRejectionItems}
        </div>

        <button
          type="submit"
          disabled={!isValid || !userAcceptedFiles.length}
          className="bg-green-400 disabled:bg-gray-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
