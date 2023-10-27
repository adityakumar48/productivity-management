"use client";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TodoHomepage from "../todo/page";
import HeroSection from "../components/HeroSection";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status == "loading") return <h1>Loading...</h1>;

  return (
    <>
      {status === "authenticated" ? (
        <main className="flex">
          <Sidebar />
          <main className="w-[80%] ml-[20%]">
            <Navbar />
            <TodoHomepage />
          </main>
        </main>
      ) : (
        <HeroSection />
      )}
    </>
  );
}
