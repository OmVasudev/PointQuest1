import Link from "next/link";
import { Button, buttonVariants } from "../@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="py-2  fixed w-full z-10 top-10">
      <div className="container flex items-center justify-between">
        <Link href="/">Logo</Link>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link className={buttonVariants()} href="/sign-in">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
