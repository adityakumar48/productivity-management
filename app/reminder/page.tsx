"use client";
import React, { useEffect, useState } from "react";
import CreateReminder from "./components/CreateReminder";
import ShowAllReminder from "./components/ShowAllReminder";
import { Reminder } from "@prisma/client";
import axios from "axios";

const ReminderHomepage = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/reminder");
      const data = await res.data;
      setReminders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="md:px-16 px-8 pt-4">
      <h1 className="font-poppins text-3xl md:text-4xl font-bold">Reminder</h1>
      <p className="text-gray-400 "> Set and manage your reminders... </p>

      {/* Show all reminders Label */}
      <div className="flex justify-between items-center mt-8">
        <h1 className="font-poppins text-2xl font-semibold">All Reminders</h1>
        <CreateReminder fetchData={fetchData} />
      </div>

      {/* Show All Reminders */}
      <ShowAllReminder reminders={reminders} setReminders={setReminders} />
    </div>
  );
};

export default ReminderHomepage;
