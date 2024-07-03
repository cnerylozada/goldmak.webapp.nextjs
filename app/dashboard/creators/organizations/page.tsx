import { auth } from "@/auth";
import { ListOrganizations } from "@/modules/organization/ListOrganizations";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyOrganizationsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="">
      <div>OrganizationsDashboardPage</div>
      <div>
        <button className="bg-yellow-200">
          <Link href={"./organizations/create"}>Create new Organization</Link>
        </button>
      </div>
      <div>
        <ListOrganizations creatorId={session.user?.id!} />
      </div>
    </div>
  );
}
