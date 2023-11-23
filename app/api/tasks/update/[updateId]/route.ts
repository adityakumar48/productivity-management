import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { updateId: string } }
) {
  try {
    const body = await request.json();
    const { Task, description, priority } = body;

    const taskUpdate = await prisma.task.update({
      where: {
        id: parseInt(params.updateId),
      },
      data: {
        Task: Task || undefined,
        description: description || undefined,
        priority: priority || undefined,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
