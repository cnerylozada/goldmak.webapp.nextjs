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
      <div className="mb-4 text-3xl font-bold">MyOrganizationDetailPage</div>

      <div className="mb-4">
        <Link
          href={`./${params.organizationId}/products/create`}
          className="group inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
        >
          <span className="block rounded-sm bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
            Add new Product
          </span>
        </Link>
      </div>

      <div>
        <ListProducts organizationId={params.organizationId} />
      </div>
    </div>
  );
}
