import { NextResponse } from "next/server";
import { db } from "@repo/db";

interface StudentResponse {
  name: string;
  passingYear: string;
  USN: string;
  branch: string;
  points: number;
  clubName?: string;
  activityName?: string;
}

export async function GET(req: Request) {
  try {
    const students = await db.student.findMany({
      select: {
        firstName: true,
        lastName: true,
        passingYear: true,
        USN: true,
        branch: true,
        points: true,
        clubName: true,
        activityName: true,
      },
    });

    // Transform the data to match the desired structure
    const studentResponses: StudentResponse[] = students.map((student) => ({
      name: `${student.firstName} ${student.lastName}`,
      passingYear: student.passingYear,
      USN: student.USN,
      branch: student.branch,
      points: student.points,
      clubName: student.clubName ?? undefined, // Convert null to undefined
      activityName: student.activityName ?? undefined, // Convert null to undefined
    }));

    return NextResponse.json(studentResponses, { status: 200 });
  } catch (error) {
    console.error("Error fetching students", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
