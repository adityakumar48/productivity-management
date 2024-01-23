"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Admin = () => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return <div>Admin</div>;
};

export default Admin;
