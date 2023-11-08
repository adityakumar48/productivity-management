"use client";
import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
const Auth = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    window.location.href = "/api/auth/signin";
  }

  return <div>{children}</div>;
};

export default Auth;
