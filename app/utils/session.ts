import { getServerSession } from "next-auth";

export const userId = getServerSession().then((session) => session?.user.id!);
