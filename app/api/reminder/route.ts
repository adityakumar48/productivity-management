import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import runTasks from "@/app/services/reminderService";
import axios from "axios";

// Create A Reminder
export async function POST(request: NextRequest) {
  const { title, description, status, type, time } = await request.json();
  const session = await getServerSession(authOptions);

  console.log(time.slice(0, 19).replace("T", " "));

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
    // await axios.post("http://localhost:8000/", reminder);

    return NextResponse.json(reminder, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session?.user?.id);

    // Get all reminders
    const reminders = await prisma.reminder.findMany({
      where: {
        userId: session?.user?.id,
      },
    });

    return NextResponse.json(reminders, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something Went Wrong", { status: 500 });
  }
}
