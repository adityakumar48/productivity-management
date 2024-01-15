import { getServerSession } from "next-auth";
export const dynamic = "force-dynamic";

export const userId = getServerSession().then((session) => session?.user.id!);
