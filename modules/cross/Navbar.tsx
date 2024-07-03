// "use client";
import { auth, signOut } from "@/auth";
import Link from "next/link";

export const Navbar = async () => {
  const session = await auth();
  return (
    <div className="bg-yellow-200">
      <div>Navbar</div>
      <div className="">
        {!session && (
          <div>
            <Link href={"/login"}>Login</Link>
          </div>
        )}

        <div>
          {!!session && (
            <div>
              <div>{JSON.stringify(session)}</div>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit">Sign out</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
