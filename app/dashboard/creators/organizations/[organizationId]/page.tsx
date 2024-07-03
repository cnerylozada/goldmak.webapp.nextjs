import { auth } from "@/auth";
import { ListProducts } from "@/modules/product/ListProducts";
import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function MyOrganizationDetailPage({
  params,
}: {
  params: { organizationId: string };
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const isValidOrg = await prisma.organization.findUnique({
    where: {
      id: params.organizationId,
    },
    select: { id: true },
  });
  if (!isValidOrg) return notFound();

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
