"use client";
import React, { useEffect, useState } from "react";
import NotesCard from "./components/NotesCard";
import NotesHeader from "./components/NotesHeader";
import { useSession } from "next-auth/react";
import axios from "axios";
import NoteLoading from "./NoteLoading";
import Spinner from "../components/Spinner";
import { Notes } from "@prisma/client";

const NotesHomePage = () => {
  const [notes, setNotes] = useState<Notes[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingCards, setLoadingCards] = useState<number>(3);

  // get notes
  const getNotes = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/notes");
      const data = await res.data;
      setNotes(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  // get notes by id

  // update notes
  // delelte notes

  const handleDelete = async (id: String) => {
    try {
      setNotes((prev) => {
        return prev?.filter((item) => item?.id! !== id);
      });
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
        {isLoading && <NoteLoading loadingCards={loadingCards} />}
        {notes &&
          notes.map((item, i) => (
            <>
              <NotesCard
                item={item}
                key={i}
                getNotes={getNotes}
                handleDelete={handleDelete}
              />
            </>
          ))}
        {notes?.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full h-[50vh]">
            <p className="text-xl font-bold font-poppins">No Notes Found</p>
            <p className="text-md font-poppins">
              Create a new note to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesHomePage;
