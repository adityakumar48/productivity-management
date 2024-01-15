import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import { Task } from "@prisma/client";

export const dynamic = "force-dynamic";

const calculateTime = (tasks: Task[]) => {
  let totalTime = 0;
  tasks.forEach((task) => {
    const time = task.Time;
    const timeArray = time.split(":");
    const hours = parseInt(timeArray[0]);
    const minutes = parseInt(timeArray[1]);
    const seconds = parseInt(timeArray[2]);
    totalTime += hours * 3600 + minutes * 60 + seconds;
  });

  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);
  const seconds = Math.floor((totalTime % 3600) % 60);

  return {
    hours,
    minutes,
    seconds,
  };
};

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const tasks = await prisma.task.findMany({
      where: {
        userId: session?.user.id!,
      },
    });

    const reminder = await prisma.reminder.findMany({
      where: {
        userId: session?.user.id!,
      },
    });

    const completedTasks = await prisma.task.findMany({
      where: {
        Status: "COMPLETED",
        userId: session?.user.id!,
      },
    });

    const calculatedCompletedTaskTime = calculateTime(completedTasks);

    const notes = await prisma.notes.findMany({
      where: {
        userId: session?.user.id!,
      },
    });

    // count of tasks
    const taskCount = tasks.length;
    // count of reminders
    const reminderCount = reminder.length;
    // count of notes
    const notesCount = notes.length;

    return NextResponse.json({
      taskCount,
      reminderCount,
      notesCount,
      completedTasks: completedTasks.length,
      completedTaskTime: calculatedCompletedTaskTime,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(500);
  }
}
