"use client";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const UserAccountNav = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `http://localhost:3003/sign-in`,
        })
      }
      variant="destructive"
    >
      Sign out
    </Button>
  );
};

export default UserAccountNav;
