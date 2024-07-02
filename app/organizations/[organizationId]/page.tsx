import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

export default async function OrganizationDetailPage({
  params,
}: {
  params: { organizationId: string };
}) {
  const organizationDetail = await prisma.organization.findUnique({
    where: { id: params.organizationId },
  });
  if (!organizationDetail) return notFound();

  return (
    <div className="">
      <div>OrganizationDetailPage</div>
      <div>{JSON.stringify(organizationDetail)}</div>
    </div>
  );
}
