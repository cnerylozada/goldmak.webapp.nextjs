import prisma from "@/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MyOrganizationsPage({
  params,
}: {
  params: { creatorId: string };
}) {
  const isValidUser = await prisma.user.findUnique({
    where: { id: params.creatorId },
  });
  if (!isValidUser) return notFound();

  const dataResponse = await prisma.organization.findMany({
    where: {
      userId: {
        equals: params.creatorId,
      },
    },
    include: {
      resourceFiles: {
        select: {
          bucketKey: true,
        },
      },
    },
    skip: 0,
    take: 2,
  });

  return (
    <div className="">
      <div>OrganizationsDashboardPage</div>
      <div>
        <button className="bg-yellow-200">
          <Link href={"./organizations/create"}>Create new Organization</Link>
        </button>
      </div>
      <div>
        {dataResponse!.map((_) => (
          <div key={_.id}>
            <div>{_.id}</div>
            <div>{_.name}</div>
            <div>
              <Image
                src={`${_.resourceFiles[0].bucketKey}`}
                width={180}
                height={37}
                alt={_.resourceFiles[0].bucketKey}
              />
            </div>
            <div>{_.description}</div>
            <div>{_.createdAt.toString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
