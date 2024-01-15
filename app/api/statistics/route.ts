import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: session?.user.id!,
      },
    });
    console.log(tasks);

    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return NextResponse.json(500);
  }
}
