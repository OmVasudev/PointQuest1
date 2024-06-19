import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <div>View clubs</div>
      <Button>
        <Link href="/add-club">Create Club</Link>
      </Button>
      <Button>
        <Link href="/bod-sign-up">Add BOD</Link>
      </Button>
    </div>
  );
};

export default page;
