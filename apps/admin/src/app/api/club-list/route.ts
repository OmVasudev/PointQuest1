import { NextResponse } from "next/server";
import { db } from "@repo/db";

interface ClubResponse {
  name: string;
  facultyCoordinator: string;
  president: string;
  techLead: string;
}

export async function GET(req: Request) {
  try {
    const clubs = await db.club.findMany({
      select: {
        name: true,
        faculty: true,
        president: true,
        techLead: true,
      },
    });

    // Transform the data to match the desired structure
    const clubResponses: ClubResponse[] = clubs.map((club) => ({
      name: club.name,
      facultyCoordinator: club.faculty,
      president: club.president,
      techLead: club.techLead,
    }));

    return NextResponse.json(clubResponses, { status: 200 });
  } catch (error) {
    console.error("Error fetching clubs", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
