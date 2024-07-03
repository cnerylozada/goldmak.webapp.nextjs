"use client";
import { IResourceFileToUpload } from "@/models/models";
import { uploadListOfOrganizationResourceFiles } from "@/server-actions/manageFiles";
import { attachResourceFilesToOrganization } from "@/server-actions/organizations";
import { mapAcceptedFilesToResourcesToUpload } from "@/utils/utils";
import {
  OrganizationSchemaType,
  organizationSchema,
} from "@/validations/organizations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Organization } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm, SubmitHandler } from "react-hook-form";

export const CreateOrganizationForm = ({
  creatorId,
}: {
  creatorId: string;
}) => {
  const [submissionError, setSubmissionError] = useState({ message: "" });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<OrganizationSchemaType>({
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

  const onSubmit: SubmitHandler<OrganizationSchemaType> = async (data) => {
    setSubmissionError({ message: "" });

    const fetchCreateOrganization = await fetch(
      `/api/creators/${creatorId}/organizations`,
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
    const queryResponse = await fetchCreateOrganization.json();
    if (queryResponse.error) {
      setSubmissionError({ message: queryResponse.error });
      return;
    }

    const newOrganization: Organization = queryResponse;
    const fileItems = await mapAcceptedFilesToResourcesToUpload(
      userAcceptedFiles
    );
    const resourceFile: IResourceFileToUpload = {
      organizationId: newOrganization.id,
      resourceType: "organization",
      fileItems,
    };
    const resourcesUploadedList = await uploadListOfOrganizationResourceFiles(
      resourceFile
    );
    await attachResourceFilesToOrganization(
      newOrganization.id,
      resourcesUploadedList
    );
    router.push(`../organizations`);
  };

  return (
    <div>
      <div>Organization Form</div>

      {submissionError.message && (
        <div className="text-red-600 font-bold uppercase">
          {submissionError.message}
        </div>
      )}

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
          disabled={!isValid || !userAcceptedFiles.length}
          className="bg-green-400 disabled:bg-gray-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
