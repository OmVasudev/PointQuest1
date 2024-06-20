import { NextResponse } from "next/server";
import { db } from "@repo/db";
import * as z from "zod";

const pointsSchema = z.object({
  clubName: z.string().min(1, "Club name is required").max(30),
  activityName: z.string().min(1, "Activity Name is required").max(30),
  points: z.string().min(1, "Activity Points is required").max(30),
  USN: z
    .string()
    .min(1, "Usn is required")
    .length(10, "USN must be exactly 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      clubName,
      activityName,
      points: pointsString,
      USN,
    } = pointsSchema.parse(body);

    // Validate USN exists in database
    const existingStudent = await db.student.findUnique({
      where: {
        USN: USN.toLowerCase(), // Ensure USN is a string and converted to lowercase
      },
    });

    if (!existingStudent) {
      return NextResponse.json(
        {
          message: "Student with provided USN not found",
        },
        { status: 404 }
      );
    }

    // Convert points from string to integer
    const newPoints = parseInt(pointsString, 10);

    if (isNaN(newPoints)) {
      return NextResponse.json(
        {
          message: "Invalid points value",
        },
        { status: 400 }
      );
    }

    // Calculate new total points (assuming 'points' in database is an integer)
    const currentPoints = existingStudent.points;
    const updatedPoints = currentPoints + newPoints;

    // Update student record with new points
    const updatedStudent = await db.student.update({
      where: {
        USN: existingStudent.USN,
      },
      data: {
        clubName: clubName,
        activityName: activityName,
        points: updatedPoints,
      },
    });

    if (!updatedStudent) {
      throw new Error("Failed to update student record");
    }

    return NextResponse.json(
      {
        student: updatedStudent,
        message: "Points updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
