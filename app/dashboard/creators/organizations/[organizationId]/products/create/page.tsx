import { auth } from "@/auth";
import { CreateProductForm } from "@/modules/product/CreateProductForm";
import prisma from "@/prisma/client";
import { notFound, redirect } from "next/navigation";

export default async function CreateProductPage({
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
      <div>CreateProductPage</div>
      <CreateProductForm organizationId={params.organizationId} />
    </div>
  );
}
