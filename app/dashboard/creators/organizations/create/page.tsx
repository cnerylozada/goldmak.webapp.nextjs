import { auth } from "@/auth";
import { CreateOrganizationForm } from "@/modules/organization/CreateOrganizationForm";
import { redirect } from "next/navigation";

export default async function CreateOrganizationPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="">
      <div>CreateOrganizationPage</div>
      <CreateOrganizationForm creatorId={session.user?.id!} />
    </div>
  );
}
