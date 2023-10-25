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

  return NextResponse.json(tasks || null);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json(task);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      Status: "processing",
    },
  });

  return NextResponse.json(task);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      Status: "completed",
    },
  });

  return NextResponse.json(task);
}
