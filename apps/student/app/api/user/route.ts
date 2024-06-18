import { NextResponse } from "next/server";
import { db } from "@repo/db";
import { hash } from "bcrypt";
import * as z from "zod";

const studentSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have 8 characters"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  phoneNo: z
    .string()
    .min(1, "Phone number is required")
    .length(10, "Phone number must be exactly 10 digits"),
  branch: z.string().min(1, "Branch is required"),
  USN: z
    .string()
    .min(1, "Usn is required")
    .length(10, "USN must be exactly 10 characters"),
  passingYear: z
    .string()
    .min(4, "Year must be exactly 4")
    .max(4, "Year must be exactly 4"),
});

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
    } = studentSchema.parse(body);

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
