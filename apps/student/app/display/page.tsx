import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import ClubCard from "../../components/ClubCard";
import { db } from "@repo/db";

interface Club {
  id: string;
  name: string;
  description: string;
  image: string;
}

async function getUser(email: string) {
  const user = await db.student.findUnique({
    where: {
      email,
    },
  });
  return user;
}

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  const user = await getUser(session?.user.email || "");
  console.log(user);

  // Fetch clubs data
  const response = await fetch("http://localhost:3002/api/clubs");
  const clubs: Club[] = await response.json();

  return (
    <div>
      <h1>All Clubs</h1>
      <div>
        {clubs.map((club) => (
          <ClubCard
            key={club.id}
            imageSrc={club.description}
            title={club.name}
          />
          // <div key={club.id}>
          //   <h2>{club.name}</h2>
          //   <p>{club.description}</p>
          //   <img src={club.image} alt={club.name} />
          // </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
