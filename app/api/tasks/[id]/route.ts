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

async function createTimer(status: string, taskId: string) {
  let startTime = 0;

  if (status === "processing") {
    startTime = Date.now();

    if (parseInt(taskId) === undefined || parseInt(taskId) === null) return;
    const timerInterval = setInterval(async () => {
      try {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // in seconds

        const hours = Math.floor(elapsedTime / 3600);
        const minutes = Math.floor((elapsedTime % 3600) / 60);
        const seconds = elapsedTime % 60;

        const formattedTime = `${hours}h:${minutes}m:${seconds}s`;
        if (taskId === undefined || taskId === null) return;

        prisma.task
          .findUnique({
            where: {
              id: parseInt(taskId),
            },
          })
          .then((task) => {
            if (task?.Status !== "processing") {
              clearInterval(timerInterval);
              // Database return user console log message
              console.log("Timer stopped");
              return saveToDatabase(formattedTime, taskId);
            }
          });

        return formattedTime;
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  }
}

const saveToDatabase = async (time: string, taskId: string) => {
  try {
    if (taskId === undefined || taskId === null) return;

    await prisma.task.update({
      where: {
        id: parseInt(taskId),
      },
      data: {
        Time: time,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

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

    // GET THE UPDATED TASK FROM THE DATABASE
    const updatedTask = await prisma.task.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    console.log(updatedTask);

    return NextResponse.json(updatedTask);
  } catch (err) {
    console.log(err);
  }
}
