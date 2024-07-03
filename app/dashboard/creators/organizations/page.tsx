import { auth } from "@/auth";
import { ListOrganizations } from "@/modules/organization/ListOrganizations";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyOrganizationsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="">
      <div className="mb-4 text-3xl font-bold">OrganizationsDashboardPage</div>

      <div className="mb-4">
        <Link
          href={"./organizations/create"}
          className="group inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
        >
          <span className="block rounded-sm bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
            Create new Organization
          </span>
        </Link>
      </div>

      <div>
        <ListOrganizations creatorId={session.user?.id!} />
      </div>
    </div>
  );
}
