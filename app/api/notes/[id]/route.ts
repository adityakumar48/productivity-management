import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
    console.log(params.id);

    const notes = await prisma.notes.delete({
      where: {
        id: params.id,
      },
    });

    console.log(notes);

    return NextResponse.json(notes);
  } catch (err) {
    console.log(err);
  }
}
