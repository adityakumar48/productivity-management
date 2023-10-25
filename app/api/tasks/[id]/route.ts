import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tasks = await prisma.task.findMany({
    where: {
      ProfileId: parseInt(params.id),
    },
  });

  const today = new Date();

  const todayTasks = tasks.filter((task) => {
    return (
      task.createdAt.getDate() === today.getDate() &&
      task.createdAt.getMonth() === today.getMonth() &&
      task.createdAt.getFullYear() === today.getFullYear()
    );
  });

  return NextResponse.json(todayTasks);
}
