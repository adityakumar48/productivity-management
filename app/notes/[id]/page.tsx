"use client";
import { Notes } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";

const NotesIdPage = ({ params }: { params: { id: string } }) => {
  const { data: session, status } = useSession();

  const { id } = params;

  const [note, setNote] = useState<Notes>();

  const getNote = async () => {
    try {
      const res = await axios.get(`/api/notes/${id}`);
      const data = await res.data;
      setNote(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  return status === "loading" ? (
    <p>Loading...</p>
  ) : (
    <div className="mx-16 mt-8">
      {/* <p>Post Id:- {id}</p> */}

      <p className=" text-5xl font-poppins font-bold ">{note?.Title}</p>
      <p className=" text-neutral-500 text-sm pt-2 flex items-center gap-2">
        {" "}
        <FaRegClock />{" "}
        <span>
          {note?.createdAt.toLocaleString().split("T")[0]} -{" "}
          {session?.user.name!}
        </span>
      </p>
      <div className="prose w-full mt-8 ">
        {/* @ts-ignore */}
        <ReactMarkdown>{note?.Content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default NotesIdPage;
