// import { NextResponse } from "next/server";
// import { db } from "@repo/db";
// import { hash } from "bcrypt";
// import { z } from "zod";

// const eventSchema = z.object({
//   name: z.string().min(1, "Event Name is required").max(30),
//   description: z.string().min(1, "Description is required").max(50),
//   contact: z.string().min(1, "Contact Details is required").max(30),
//   link: z.string().min(1, "Faculty Name is required").max(30),
//   points: z.string().min(1, "Activity Points is required").max(30),
//   clubId: z.string().min(1, "Club name  is required").max(30),
//   viewImage: z.string().min(1, "Event Banner is required").max(30),
//   downloadImage: z.string().min(1, "Event Banner is required").max(30),
// });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const formData = eventSchema.parse(body);

//     const newEvent = await db.event.create({
//       data: {
//         name: formData.name,
//         description: formData.description,
//         contact: formData.contact,
//         link: formData.link,
//         points: Number(formData.points),
//         viewImage: formData.viewImage,
//         downloadImage: formData.downloadImage,
//         club: {
//           connect: { id: formData.clubId }, // Connect BOD to a club by ID
//         },
//       },
//     });

//     return NextResponse.json(
//       {
//         bod: newEvent,
//         message: "Event created successfully",
//       },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error("Error creating BOD", error);
//     return NextResponse.json(
//       {
//         message: "Failed to create Event",
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { db } from "@repo/db";
import { z } from "zod";

const eventSchema = z.object({
  name: z.string().min(1, "Event Name is required").max(30),
  description: z.string().min(1, "Description is required").max(50),
  contact: z.string().min(1, "Contact Details is required").max(30),
  link: z.string().min(1, "Link is required").max(30),
  points: z.string().min(1, "Points is required"),
  clubId: z.string().min(1, "Club ID is required"),
  viewImage: z.string().min(1, "View Image is required"),
  downloadImage: z.string().min(1, "Download Image is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const formData = eventSchema.parse(body);

    const newEvent = await db.event.create({
      data: {
        name: formData.name,
        description: formData.description,
        contact: formData.contact,
        link: formData.link,
        points: parseInt(formData.points, 10), // Convert points string to number
        viewImage: formData.viewImage,
        downloadImage: formData.downloadImage,
        club: {
          connect: { id: formData.clubId },
        },
      },
    });

    return NextResponse.json(
      {
        bod: newEvent,
        message: "Event created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Event", error);
    return NextResponse.json(
      {
        message: "Failed to create Event",
      },
      { status: 500 }
    );
  }
}
