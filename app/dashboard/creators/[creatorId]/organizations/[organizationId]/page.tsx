import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

export default async function MyOrganizationDetailPage({
  params,
}: {
  params: { creatorId: string; organizationId: string };
}) {
  const organizationDetail = await prisma.organization.findMany({
    where: {
      AND: [{ id: params.organizationId }, { userId: params.creatorId }],
    },
  });

  if (!organizationDetail.length) return notFound();

  return (
    <div className="">
      <div>MyOrganizationDetailPage</div>
      <div>{JSON.stringify(organizationDetail)}</div>
    </div>
  );
}
