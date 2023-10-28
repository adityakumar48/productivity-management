import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  const user = await prisma.user.findUnique({
    where: {
      email: params!.id,
    },
  });

  return NextResponse.json(user);
}
