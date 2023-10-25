import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const user =
    (await prisma.profile.findMany({
      where: {
        isAdmin: true,
      },
    })) || null;
  const tasks = await prisma.task.findMany();
  if (user.length > 0) {
    return NextResponse.json(tasks);
  }

  return NextResponse.json(
    {
      error: "You must be an admin to view this page.",
    },
    { status: 403 }
  );
}
