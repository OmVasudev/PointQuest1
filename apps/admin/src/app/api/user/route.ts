import { NextResponse } from "next/server";
import { db } from "@repo/db";
import { hash } from "bcrypt";
import * as z from "zod";

const adminSchema = z.object({
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
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, phoneNo, branch, USN } =
      adminSchema.parse(body);

    //check if email already exists
    const existingUserByEmail = await db.admin.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          admin: null,
          message: "Admin with this email already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newAdmin = await db.admin.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNo,
        branch,
        USN,
      },
    });

    const { password: newAdminPassword, ...rest } = newAdmin;

    return NextResponse.json(
      {
        admin: rest,
        message: "Admin created successfully",
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
