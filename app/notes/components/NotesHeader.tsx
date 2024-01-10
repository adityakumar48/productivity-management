import React from "react";
import CreateNotes from "./CreateNotes";

const NotesHeader = ({ getNotes }: { getNotes: () => Promise<void> }) => {
  return (
    <>
      <h1 className="font-poppins text-3xl md:text-4xl font-bold">Notes</h1>
      <p className="text-gray-400 "> Write and manage your notes... </p>

      {/* Show all reminders Label */}
      <div className="flex justify-between items-center mt-8">
        <h1 className="font-poppins text-2xl font-semibold">All Notes</h1>
        <CreateNotes getNotes={getNotes} />
      </div>
    </>
  );
};

export default NotesHeader;
