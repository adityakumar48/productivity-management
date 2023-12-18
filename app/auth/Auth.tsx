"use client";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import DashboardLoading from "../Dashboard/loading";
import LandingPage from "../components/LandingPage/LandingPage";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Auth = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const notSignedIn = !session;
  if (loading) return <DashboardLoading />;
  if (notSignedIn) return <LandingPage />;

  return (
    <main className="md:flex block">
      <div>
        <Sidebar />
      </div>
      <main className="md:w-[80%] md:ml-[20%]">
        <Navbar />
        {children}
      </main>
    </main>
  );
};

export default Auth;
