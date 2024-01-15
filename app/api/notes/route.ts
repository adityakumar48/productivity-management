import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";

export const dynamic = "force-dynamic";

// Get all notes for the current user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id!;

    const notes = await prisma.notes.findMany({
      where: {
        userId: userId,
      },
    });
    ``;

    console.log(notes);

    return NextResponse.json(notes);
  } catch (err) {
    console.log(err);
    return NextResponse.json(500);
  }
}

// Create a new note for the current user
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const body = await request.json();

    const { title, content } = body;
    const note = await prisma.notes.create({
      data: {
        userId: session?.user.id!,
        Title: title,
        Content: content,
      },
    });

    return NextResponse.json(note);
  } catch (err) {
    console.log(err);
    return NextResponse.json(500);
  }
}
