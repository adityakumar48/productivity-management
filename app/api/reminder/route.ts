import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import runTasks from "@/app/services/reminderService";

// Create A Reminder
export async function POST(request: NextRequest) {
  const { title, description, status, type, time } = await request.json();
  const session = await getServerSession(authOptions);

  // Create a new reminder
  try {
    const reminder = await prisma.reminder.create({
      // @ts-ignore
      data: {
        Title: title,
        Description: description,
        Email: session?.user?.email,
        Status: status,
        Type: type,
        Time: time,
        userId: session?.user?.id,
        name: session?.user?.name,
      },
    });
    console.log(`Reminder Created :- ${reminder.Title}`);

    return NextResponse.json(reminder, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request: NextRequest) {
  let flag = false;
  if (flag === false) {
    runTasks();
    flag = true;
  } else {
    flag = false;
    console.log("Already Running");
  }

  return NextResponse.json({});
}
