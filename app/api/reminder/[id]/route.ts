import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reminder = await prisma.reminder.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(reminder);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
