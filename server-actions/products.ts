"use server";

import prisma from "@/prisma/client";
import { Product } from "@prisma/client";

export const createProductInOrganization = async (
  organizationId: string,
  basicProduct: Product
) => {
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
  return newProduct;
};
