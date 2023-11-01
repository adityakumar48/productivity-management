"use client";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TodoHomepage from "../todo/page";
import DashboardLoading from "./loading";
import LandingPage from "../components/LandingPage/LandingPage";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status == "loading") return <DashboardLoading />;

  return (
    <>
      {status === "authenticated" ? (
        <main className="md:flex block">
          <div>
            <Sidebar />
          </div>
          <main className="md:w-[80%] md:ml-[20%]">
            <Navbar />
            <TodoHomepage />
          </main>
        </main>
      ) : (
        <LandingPage />
      )}
    </>
  );
}
