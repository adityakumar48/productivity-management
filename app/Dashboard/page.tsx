"use client";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TodoHomepage from "../task/page";
import DashboardLoading from "./loading";
import LandingPage from "../components/LandingPage/LandingPage";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status == "loading") return <DashboardLoading />;

  return <>{status === "authenticated" ? <TodoHomepage /> : <LandingPage />}</>;
}
