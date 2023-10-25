import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  try {
    const { Task, Status, ProfileId } = await request.json();

    const task = await prisma.task.create({
      data: {
        Task,
        Status,
        ProfileId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something Wrong",
      },
      { status: 403 }
    );
  }
}

export async function GET(request: NextRequest) {
  const user = await prisma.profile.findMany({
    where: {
      isAdmin: true,
    },
  });
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
