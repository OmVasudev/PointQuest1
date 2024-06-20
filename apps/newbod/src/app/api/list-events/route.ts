import { NextResponse } from "next/server";
import { db } from "@repo/db";

interface EventResponse {
  name: string;
  facultyCoordinator: string;
  eventCoordinator: string;
  activityPoints: number;
}

export async function GET(req: Request) {
  try {
    const events = await db.event.findMany({
      select: {
        name: true,
        points: true,
        club: {
          select: {
            faculty: true,
            president: true, // Assuming this is the event coordinator
          },
        },
      },
    });

    // Transform the data to match the desired structure
    const eventResponses: EventResponse[] = events.map((event) => ({
      name: event.name,
      facultyCoordinator: event.club.faculty,
      eventCoordinator: event.club.president,
      activityPoints: event.points,
    }));

    return NextResponse.json(eventResponses, { status: 200 });
  } catch (error) {
    console.error("Error fetching events", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
