"use client";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { signIn } from "next-auth/react";

export const Mock = () => {
  return (
    <div>
      <div>
        <button
          onClick={() => {
            signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT_URL });
          }}
        >
          Signin with Google
        </button>
      </div>
    </div>
  );
};
