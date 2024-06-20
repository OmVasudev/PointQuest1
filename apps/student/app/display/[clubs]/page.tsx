import { db } from "@repo/db";

async function getClubs(clubname: string) {
  const club = db.club.findFirst({
    where: {
      name: clubname,
    },
  });
  return club;
}

async function getEvents(id: string) {
  const events = db.event.findMany({
    where: {
      clubId: id,
    },
  });
  return events;
}

const page = async ({ params }: { params: { clubs: string } }) => {
  const clubs = params.clubs;
  const club = await getClubs(params.clubs);
  const events = await getEvents(club?.id || "");
  console.log(events);
  console.log(club);
  console.log(clubs);
  return (
    <div>
      <h1>{club?.name}</h1>
      <h1>{events[0].name}</h1>
      <h1>{events[0].description}</h1>
    </div>
  );
};

export default page;
