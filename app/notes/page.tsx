"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  deleteNote,
  getNotesById,
  setNotes,
} from "../redux/slices/notes/index";
import NoteLoading from "./NoteLoading";
import NotesCard from "./components/NotesCard";
import NotesHeader from "./components/NotesHeader";

const NotesHomePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingCards, setLoadingCards] = useState<number>(3);
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.notes);

  // get notes
  const getNotes = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/notes");
      const data = await res.data;
      dispatch(setNotes(data));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (notes.length === 0) {
      getNotes();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = async (id: string) => {
    try {
      dispatch(deleteNote(id!));
      const res = await axios.delete(`/api/notes/${id}`);
      const data = await res.data;
      // getNotes();
    } catch (err) {
      console.log(err);
    }
  };

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
