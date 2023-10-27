import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: params.id,
      },
    });

    return NextResponse.json(tasks || null);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const task = await prisma.task.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const task = await prisma.task.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        Status: "processing",
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const task = await prisma.task.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        Status: "completed",
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

// create a timer function that will start when status is processing and stop when status is completed format into 00h:00m:00s
// create a function that will save the timer to db
// create a function that will return the timer to client side

async function createTimer(status: string, taskId: string) {
  let startTime = 0;

  if (status === "processing") {
    startTime = Date.now();

    if (parseInt(taskId) === undefined || parseInt(taskId) === null) return;
    const timerInterval = setInterval(async () => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // in seconds

      const hours = Math.floor(elapsedTime / 3600);
      const minutes = Math.floor((elapsedTime % 3600) / 60);
      const seconds = elapsedTime % 60;

      const formattedTime = `${hours}h:${minutes}m:${seconds}s`;

      await prisma.task.update({
        where: {
          id: parseInt(taskId),
        },
        data: {
          Time: formattedTime,
        },
      });

      const task = await prisma.task.findUnique({
        where: {
          id: parseInt(taskId),
        },
      });

      if (task?.Status !== "processing") {
        clearInterval(timerInterval);
      }
      return formattedTime;
    }, 1000);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    // console.log(task?.Time);
    const res = createTimer(String(task?.Status), params.id);
    console.log(res.then((res) => console.log(res)));

    // create stopwatch if status is processing then start it timer 00h:00m:00s and save it to db and return it to client side
    // if status is completed then stop timer and save it to db and return it to client side

    return NextResponse.json(task);
  } catch (err) {
    console.log(err);
  }
}
