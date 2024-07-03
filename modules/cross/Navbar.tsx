// "use client";
import { auth, signOut } from "@/auth";
import Link from "next/link";

export const Navbar = async () => {
  const session = await auth();
  return (
    <div className="mb-4 px-4 py-3 bg-yellow-300 flex items-center justify-between">
      <div>
        <Link href={"/"} className="text-3xl font-bold">
          GM
        </Link>
      </div>
      <div className="">
        {!session && (
          <div>
            <Link href={"/login"}>Login</Link>
          </div>
        )}

        <div>
          {!!session && (
            <div className="flex items-center space-x-4">
              <div>{session.user?.name}</div>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="group inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                >
                  <span className="block rounded-sm bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
                    Sign out
                  </span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
