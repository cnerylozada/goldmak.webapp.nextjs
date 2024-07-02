import { ListOrganizations } from "@/modules/organization/ListOrganizations";
import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MyOrganizationsPage({
  params,
}: {
  params: { creatorId: string };
}) {
  const isValidUser = await prisma.user.findUnique({
    where: { id: params.creatorId },
    select: { id: true },
  });
  if (!isValidUser) return notFound();

  return (
    <div className="">
      <div>OrganizationsDashboardPage</div>
      <div>
        <button className="bg-yellow-200">
          <Link href={"./organizations/create"}>Create new Organization</Link>
        </button>
      </div>
      <div>
        <ListOrganizations creatorId={params.creatorId} />
      </div>
    </div>
  );
}
