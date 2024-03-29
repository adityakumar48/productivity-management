import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { taskSchema } from "../../ValidationSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { TaskStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

interface Task {
  Task: string;
  Status: TaskStatus;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = taskSchema.safeParse(body);
    const session = await getServerSession(authOptions);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { Task, Status }: Task = body;

    // check if user exists
    // ts-ignore
    const newTask = await prisma.task.create({
      data: {
        Task,
        Status,
        userId: session?.user!.id!,
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
    const session = await getServerSession(authOptions);
    // ts-ignore
    const userId = session?.user?.id;

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
