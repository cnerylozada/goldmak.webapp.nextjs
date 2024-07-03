import { Mock } from "@/modules/auth/Mock";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";

export default async function LoginPage() {
  const session = await auth();
  if (!!session) redirect(`${DEFAULT_LOGIN_REDIRECT_URL}`);

  return (
    <div>
      <div>Login page</div>
      <div>
        <Mock />
      </div>
    </div>
  );
}
