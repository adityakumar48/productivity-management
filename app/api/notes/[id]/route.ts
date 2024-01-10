import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// Get particular notes for the current user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const notes = await prisma.notes.findUnique({
      where: {
        id: params.id,
      },
    });

    // console.log(notes);

    return NextResponse.json(notes);
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id!;
    console.log(userId);

    console.log(params.id);

    const notes = await prisma.notes.delete({
      where: {
        id: params.id,
        userId: userId,
      },
    });

    console.log(notes);

    return NextResponse.json(notes);
  } catch (err) {
    console.log(err);
  }
}
