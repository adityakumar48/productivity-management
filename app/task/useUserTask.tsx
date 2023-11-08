"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
const UserTaskAuth = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    router.replace("/api/auth/signin");
  }

  if (status === "loading") return null;

  return <div>{children}</div>;
};

export default UserTaskAuth;
