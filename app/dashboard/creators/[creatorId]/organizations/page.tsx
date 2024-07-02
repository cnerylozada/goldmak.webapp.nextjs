import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MyOrganizationsPage({
  params,
}: {
  params: { creatorId: string };
}) {
  const creator = await prisma.user.findUnique({
    where: { id: params.creatorId },
    include: { organizations: true },
  });
  if (!creator) return notFound();

  return (
    <div className="">
      <div>OrganizationsDashboardPage</div>
      <div>
        <button className="bg-yellow-200">
          <Link href={"./organizations/create"}>Create new Organization</Link>
        </button>
      </div>
      <div>
        {creator.organizations.map((_) => (
          <div key={_.id}>
            <div>{_.id}</div>
            <div>{_.name}</div>
            <div>{_.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
