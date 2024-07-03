"use client";
import { signOut } from "next-auth/react";

export const Navbar = () => {
  return (
    <div>
      <div>Navbar</div>
      <div>
        <button
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
