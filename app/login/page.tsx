import { SignIn } from "@/modules/auth/SignIn";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";

export default async function LoginPage() {
  const session = await auth();
  if (!!session) redirect(`${DEFAULT_LOGIN_REDIRECT_URL}`);

  return (
    <div>
      <div className="mb-4 text-3xl font-bold">Login page</div>

      <div>
        <SignIn />
      </div>
    </div>
  );
}
