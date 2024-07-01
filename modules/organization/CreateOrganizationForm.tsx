"use client";
import { IResourceFileToUpload } from "@/models/models";
import { uploadListOfOrganizationResourceFiles } from "@/server-actions/manageFiles";
import { mapAcceptedFilesToResourcesToUpload } from "@/utils/utils";
import {
  OrganizationType,
  organizationSchema,
} from "@/validations/organizations";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm, SubmitHandler } from "react-hook-form";

export const CreateOrganizationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<OrganizationType>({
    mode: "all",
    resolver: zodResolver(organizationSchema),
  });

  useEffect(() => {
    reset({ name: "my-new-org", description: "mock description" });
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

  const onSubmit: SubmitHandler<OrganizationType> = async (data) => {
    // const fileItems = await mapAcceptedFilesToResourcesToUpload(
    //   userAcceptedFiles
    // );
    // const resourceFile: IResourceFileToUpload = {
    //   organizationId: "1",
    //   resourceType: "organization",
    //   fileItems,
    // };
    // const response = await uploadListOfOrganizationResourceFiles(resourceFile);
    try {
      // const response = await createOrganization(
      //   {
      //     creatorId: "cly291hd40000pz2kxwmphgcl",
      //     name: data.name,
      //     description: data.description,
      //   },
      //   host
      // );
      const query = await fetch(
        `/api/creators/cly291hd40000pz2kxwmphgcl/organizations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            description: data.description,
          }),
        }
      );
      const response = await query.json();
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div>CreateProductForm</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />

        <input {...register("description")} />

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
          //   disabled={!isValid || !userAcceptedFiles.length}
          disabled={!isValid}
          className="bg-green-400 disabled:bg-gray-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
