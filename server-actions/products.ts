"use server";

import { ICreateBasicProductDto } from "@/models/models";
import prisma from "@/prisma/client";

export const createProductInOrganization = async (
  organizationId: string,
  basicProduct: ICreateBasicProductDto
) => {
  try {
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
  } catch (error) {
    return { error: JSON.stringify(error), response: null };
  }
};
