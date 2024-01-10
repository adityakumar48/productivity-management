"use client";
import { Notes } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegClock, FaTrash } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import { Button } from "@radix-ui/themes";
import { BsPencilSquare } from "react-icons/bs";
import { FaShareAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const NotesIdPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = params;

  const [note, setNote] = useState<Notes>();

  // get notes
  const getNotes = async () => {
    const res = await axios.get(`/api/notes/${id}`);
    const data = await res.data;
    setNote(data);
  };

  useEffect(() => {
    if (id) {
      getNotes();
    }
  }, []);

  const handleDelete = async (id: String) => {
    try {
      const res = await axios.delete(`/api/notes/${id}`);
      const data = await res.data;
      router.push("/notes");
    } catch (err) {
      console.log(err);
    }
  };

  // get notes by id

  return (
    <div className="mx-16 mt-8">
      <div className="flex justify-between">
        <p className=" text-5xl font-poppins font-bold ">{note?.Title}</p>
        <div className="flex justify-end pr-5 items-center ">
          <div className="flex gap-2">
            <Button color="cyan" variant="soft">
              {" "}
              <FaShareAlt /> Save
            </Button>
            <Button variant="solid" color="iris">
              <BsPencilSquare /> Edit
            </Button>
            <Button
              variant="surface"
              color="red"
              onClick={() => handleDelete(id)}
            >
              <FaTrash />
              Delete
            </Button>
          </div>
        </div>
      </div>

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
