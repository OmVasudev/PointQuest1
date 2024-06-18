import { authOptions } from "../../lib/authOptions";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return <h2 className="text-2xl">Club page</h2>;
  }

  return <h2>Please login to see this admin page</h2>;
};

export default page;
