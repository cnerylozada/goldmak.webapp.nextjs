import { CreateOrganizationForm } from "@/modules/organization/CreateOrganizationForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

export default async function CreateOrganizationPage({
  params,
}: {
  params: { creatorId: string };
}) {
  const creator = await prisma.user.findUnique({
    where: { id: params.creatorId },
  });
  if (!creator) return notFound();

  return (
    <div className="">
      <div>CreateOrganizationPage</div>
      <CreateOrganizationForm creatorId={params.creatorId} />
    </div>
  );
}
