"use client";
import { signIn } from "next-auth/react";

export const Mock = () => {
  return (
    <div>
      <div>
        <button
          onClick={() => {
            signIn("google");
          }}
        >
          Signin with Google
        </button>
      </div>
    </div>
  );
};