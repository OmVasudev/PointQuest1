import { NextResponse } from "next/server";
import { db } from "@repo/db";

export async function GET(
  req: Request,
  { params }: { params: { clubId: string } }
) {
  const { clubId } = params;

  try {
    const events = await db.event.findMany({
      where: {
        clubId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        points: true,
        contact: true,
        link: true,
      },
    });

    return NextResponse.json(events, { status: 200 });
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
