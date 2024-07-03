"use client";
import { signIn } from "next-auth/react";

export const Mock = () => {
  return (
    <div>
      <button
        onClick={() => {
          signIn("google");
        }}
      >
        Google
      </button>
    </div>
  );
};
