import { CreateProductForm } from "@/modules/product/CreateProductForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

export default async function CreateProductPage({
  params,
}: {
  params: { creatorId: string; organizationId: string };
}) {
  const rawOrganizationDetail = await prisma.organization.findMany({
    where: {
      AND: [{ id: params.organizationId }, { userId: params.creatorId }],
    },
  });

  if (!rawOrganizationDetail.length) return notFound();
  const organization = rawOrganizationDetail[0];

  return (
    <div className="">
      <div>CreateProductPage</div>
      <CreateProductForm organizationId={organization.id} />
    </div>
  );
}
