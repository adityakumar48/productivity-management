import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
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

export default layout;
