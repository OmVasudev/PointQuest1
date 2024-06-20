import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <div>View Events</div>
      <Button>
        <Link href="/add-event">Create Event</Link>
      </Button>
      <Button>
        <Link href="/add-point">Add points</Link>
      </Button>
    </div>
  );
};

export default page;
