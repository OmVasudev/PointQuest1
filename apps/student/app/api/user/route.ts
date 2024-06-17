import { NextResponse } from "next/server";
import { db } from "@repo/db";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      password,
      phoneNo,
      branch,
      USN,
      passingYear,
    } = body;

    //check if email already exists
    const existingUserByEmail = await db.student.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { student: null, message: "student with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newStudent = await db.student.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNo,
        branch,
        USN,
        passingYear,
      },
    });

    const { password: newUserPassword, ...rest } = newStudent;

    return NextResponse.json(
      {
        student: rest,
        message: "Student created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Some thing went wrong" },
      { status: 500 }
    );
  }
}
