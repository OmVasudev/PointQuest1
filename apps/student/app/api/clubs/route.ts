import { NextResponse } from "next/server";
import { db } from "@repo/db";

export async function GET(req: Request) {
  try {
    const clubs = await db.club.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
      },
    });

    return NextResponse.json(clubs, { status: 200 });
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
