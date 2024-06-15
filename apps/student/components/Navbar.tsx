import Link from "next/link";
import { buttonVariants } from "../@/components/ui/button";

const Navbar = () => {
  return (
    <div className="py-2  fixed w-full z-10 top-10">
      <div className="container flex items-center justify-between">
        <Link href="/">Logo</Link>
        <Link className={buttonVariants()} href="/sign-in">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
