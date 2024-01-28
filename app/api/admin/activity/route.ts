import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const data = await getServerSession(authOptions);

    if (data?.user.isAdmin === true) {
      const users = await prisma.user.findMany();
      const NotesCountByUser = await prisma.user.findMany({
        include: {
          Notes: true,
          reminders: true,
          Tasks: true,
        },
      });

      //   const notesCount = await prisma;
      return NextResponse.json(NotesCountByUser);
    } else {
      return NextResponse.json({ error: "You are not an admin" });
    }
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
