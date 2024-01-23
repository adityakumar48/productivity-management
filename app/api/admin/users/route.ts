import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  try {
    const data = await getServerSession(authOptions);

    if (data?.user.isAdmin === true) {
      const allUsers = await prisma.user.findMany();
      return NextResponse.json(allUsers);
    } else {
      return NextResponse.json({ error: "You are not an admin" });
    }
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
