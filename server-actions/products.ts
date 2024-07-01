"use server";

import {
  ICreateBasicProductDto,
  IResourceUploadedResponse,
} from "@/models/models";
import prisma from "@/prisma/client";

export const createProductInOrganization = async (
  organizationId: string,
  basicProduct: ICreateBasicProductDto
) => {
  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });
  if (!organization) {
    return { error: "Organization not found", response: null };
  }
  const newProduct = await prisma.product.create({
    data: {
      organization: {
        connect: { id: organizationId },
      },
      name: basicProduct.name,
      description: basicProduct.description,
      price: basicProduct.price,
      stock: basicProduct.stock,
    },
  });
  return { response: newProduct };
};

export const attachResourceFilesToProduct = async (
  productId: string,
  resourcesUploadedList: IResourceUploadedResponse[]
) => {
  const bucketKeysList = resourcesUploadedList.map((_) => ({
    bucketKey: _.response.objectURL,
  }));

  await prisma.product.update({
    where: { id: productId },
    data: {
      resourceFiles: { create: bucketKeysList },
    },
  });
};
