"use client";
import React, { useEffect, useState } from "react";
import NotesCard from "./components/NotesCard";
import NotesHeader from "./components/NotesHeader";
import { useSession } from "next-auth/react";
import axios from "axios";

const NotesHomePage = () => {
  const [notes, setNotes] = useState([]);

  // get notes
  const getNotes = async () => {
    const res = await axios.get("/api/notes");
    const data = await res.data;
    setNotes(data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  // get notes by id

  // update notes
  // delelte notes

  const handleDelete = async (id: String) => {
    try {
      const res = await axios.delete(`/api/notes/${id}`);
      const data = await res.data;
      getNotes();
    } catch (err) {
      console.log(err);
    }
  };
  // download notes
  // share notes

  return (
    <div className="md:px-16 px-8 ">
      <NotesHeader getNotes={getNotes} />
      <div className="flex pt-5 flex-wrap gap-5">
        {notes.map((item, i) => (
          <NotesCard
            item={item}
            key={i}
            getNotes={getNotes}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesHomePage;
