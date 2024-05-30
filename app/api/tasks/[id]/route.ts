import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  // ts-ignore
  const userId = session?.user?.id;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
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

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const status = request.url.split("?")[1].split("=")[1];

    if (status === "IN_PROCESSING") {
      try {
        const task = await prisma.task.update({
          where: {
            id: parseInt(params.id),
          },
          data: {
            Status: "IN_PROCESSING",
            Time: String(new Date().getTime()),
          },
        });

        return NextResponse.json(task, { status: 200 });
      } catch (err) {
        console.log(err);
      }
    } else if (status === "COMPLETED") {
      try {
        const body = await request.json();
        const task = await prisma.task.update({
          where: {
            id: parseInt(params.id),
          },
          data: {
            Status: "COMPLETED",
            Time: body.Time,
          },
        });

        return NextResponse.json(task);
      } catch (error) {
        console.log(error);
        return NextResponse.json(error);
      }
    } else if (status === "MARK_AS_COMPLETED") {
      try {
        const task = await prisma.task.update({
          where: {
            id: parseInt(params.id),
          },
          data: {
            Status: "MARK_AS_COMPLETED",
          },
        });

        return NextResponse.json(task, { status: 200 });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
