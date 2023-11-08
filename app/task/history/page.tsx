import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import React from "react";
import Auth from "./Auth";
import HistoryFetch from "./HistoryFetch";

const HistoryTasks = () => {
  return (
    <Auth>
      <main className="md:flex block">
        <div>
          <Sidebar />
        </div>
        <main className="md:w-[80%] md:ml-[20%]">
          <Navbar />
          <HistoryFetch />
        </main>
      </main>
    </Auth>
  );
};

export default HistoryTasks;
