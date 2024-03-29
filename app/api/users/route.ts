import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const user = (await prisma.user.findMany()) || null;
  return NextResponse.json(user);
}
