// import { NextResponse } from "next/server";
// import { db } from "@repo/db";

// export async function GET(req: Request) {
//   try {
//     const clubs = await db.club.findMany({
//       select: { id: true, name: true },
//     });
//     return NextResponse.json(clubs, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { db } from "@repo/db";
import { Prisma } from "@prisma/client";

interface Club {
  id: string;
  name: string;
  // Add other fields as necessary
}

export async function GET(req: Request) {
  try {
    const clubs: Club[] = await db.club.findMany({
      select: { id: true, name: true },
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
