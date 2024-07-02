import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MyOrganizationDetailPage({
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
      <div>MyOrganizationDetailPage</div>
      <div>
        <button className="bg-yellow-200">
          <Link href={`./${organization.id}/products/create`}>
            Add new Product
          </Link>
        </button>
      </div>
      <div>{JSON.stringify(organization)}</div>
    </div>
  );
}
