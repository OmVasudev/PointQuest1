import { NextResponse } from "next/server";
import { db } from "@repo/db";
import { hash } from "bcrypt";
import { z } from "zod";

const BODSchema = z.object({
  firstName: z.string().min(1, "First Name is required").max(100),
  lastName: z.string().min(1, "Last Name is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  password: z.string().min(8, "Password must have at least 8 characters"),
  phoneNo: z
    .string()
    .min(10, "Phone number must have 10 digits")
    .max(10, "Phone number must have 10 digits"),
  branch: z.string().min(1, "Branch is required"),
  USN: z.string().min(1, "USN is required"),
  clubId: z.string().min(1, "Club ID is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const formData = BODSchema.parse(body);

    // Hash the password before saving to the database
    const hashedPassword = await hash(formData.password, 10);

    // Create BOD record in the database
    const newBOD = await db.bOD.create({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: hashedPassword,
        phoneNo: formData.phoneNo,
        branch: formData.branch,
        USN: formData.USN,
        club: {
          connect: { id: formData.clubId }, // Connect BOD to a club by ID
        },
      },
    });

    return NextResponse.json(
      {
        bod: newBOD,
        message: "BOD created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating BOD", error);
    return NextResponse.json(
      {
        message: "Failed to create BOD",
      },
      { status: 500 }
    );
  }
}
