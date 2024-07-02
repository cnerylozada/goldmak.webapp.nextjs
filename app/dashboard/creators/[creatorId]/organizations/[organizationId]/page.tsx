import { ListProducts } from "@/modules/product/ListProducts";
import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MyOrganizationDetailPage({
  params,
}: {
  params: { creatorId: string; organizationId: string };
}) {
  const areValidCretorAndOrg = await prisma.organization.findMany({
    where: {
      AND: [{ id: params.organizationId }, { userId: params.creatorId }],
    },
    select: { id: true },
  });

  if (!areValidCretorAndOrg.length) return notFound();

  return (
    <div className="">
      <div>MyOrganizationDetailPage</div>
      <div>
        <button className="bg-yellow-200">
          <Link href={`./${params.organizationId}/products/create`}>
            Add new Product
          </Link>
        </button>
      </div>
      <div>
        <ListProducts organizationId={params.organizationId} />
      </div>
    </div>
  );
}
