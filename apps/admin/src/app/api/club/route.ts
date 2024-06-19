import { NextResponse } from "next/server";
import { db } from "@repo/db";
import { hash } from "bcrypt";
import * as z from "zod";

const clubSchema = z.object({
  name: z.string().min(1, "Club Name is required").max(30),
  description: z.string().min(1, "Description is required").max(50),
  president: z.string().min(1, "President Name is required").max(30),
  faculty: z.string().min(1, "Faculty Name is required").max(30),
  techLead: z.string().min(1, "TechLead Name is required").max(30),
  image: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, president, faculty, techLead, image } =
      clubSchema.parse(body);

    const newClub = await db.club.create({
      data: {
        name,
        description,
        president,
        faculty,
        techLead,
        image,
      },
    });

    return NextResponse.json(
      {
        club: newClub,
        message: "club created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
