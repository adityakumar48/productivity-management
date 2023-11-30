import React from "react";
import ShowAllReminder from "./ShowAllReminder";
import CreateReminder from "./CreateReminder";

const ReminderHomepage = () => {
  return (
    <div className="md:px-16 px-8 pt-4">
      <h1 className="font-poppins text-3xl md:text-4xl font-bold">Reminder</h1>
      <p className="text-gray-400 "> Set and manage your reminders... </p>

      {/* Show all reminders Label */}
      <div className="flex justify-between items-center mt-8">
        <h1 className="font-poppins text-2xl font-semibold">All Reminders</h1>
        <CreateReminder />
      </div>

      {/* Show All Reminders */}
      <ShowAllReminder />
    </div>
  );
};

export default ReminderHomepage;
