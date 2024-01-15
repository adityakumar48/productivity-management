import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// Create A Reminder

export const dynamic = "force-dynamic";

interface data {
  id: string;
  title: string | null;
  description: string | null;
  Email: string | null;
  time: string | null;
  type: string | null;
  status: string | null;
  createdAt: Date;
  updatedAt: Date;
  name: string | null;
  userId: string | null;
}

export async function POST(request: NextRequest) {
  const { title, description, status, type, time } = await request.json();

  const session = await getServerSession(authOptions);

  // Create a new reminder
  try {
    const reminder = await prisma.reminder.create({
      data: {
        Title: title,
        Description: description,
        Email: session?.user?.email,
        Status: status,
        Type: type,
        Time: time,
        userId: session?.user?.id!,
        name: session?.user?.name!,
      },
    });
    console.log(`Reminder Created :- ${reminder.Title}`);

    return NextResponse.json(reminder, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
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
