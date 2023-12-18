import React from "react";
import NotesCard from "./components/NotesCard";
import NotesHeader from "./components/NotesHeader";

const NotesHomePage = () => {
  return (
    <div className="md:px-16 px-8 ">
      <NotesHeader />
      <div className="flex pt-5 flex-wrap gap-5">
        <NotesCard />
        <NotesCard />
        <NotesCard newCard={true} />
      </div>
    </div>
  );
};

export default NotesHomePage;
