import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { taskSchema } from "../../ValidationSchemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = taskSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { Task, Status, email } = body;

    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const newTask = await prisma.task.create({
      data: {
        Task,
        Status,
        userId: user?.id!,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something Wrong",
      },
      { status: 403 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    const tasks = await prisma.task.findMany({
      where: {
        userId: user?.id,
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
