import { CreateProductForm } from "@/modules/product/CreateProductForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

export default async function CreateProductPage({
  params,
}: {
  params: { creatorId: string; organizationId: string };
}) {
  const areValidCretorAndOrg = await prisma.organization.findMany({
    where: {
      AND: [{ id: params.organizationId }, { userId: params.creatorId }],
    },
    select: {
      id: true,
    },
  });

  if (!areValidCretorAndOrg.length) return notFound();
  const organizationId = areValidCretorAndOrg[0].id;

  return (
    <div className="">
      <div>CreateProductPage</div>
      <CreateProductForm organizationId={organizationId} />
    </div>
  );
}
