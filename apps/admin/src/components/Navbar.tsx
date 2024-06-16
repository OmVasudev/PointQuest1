import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Trophy } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full c-10 top-0">
      <div className="container flex item-center justify-between">
        <Link href="/">
          <Trophy />
        </Link>

        <Link className={buttonVariants()} href="/sign-in">
          Sign-in
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
