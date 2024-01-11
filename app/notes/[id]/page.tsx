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
import { ToastContainer, toast } from "react-toastify";
import EditNotes from "../components/EditNotes";

export const dynamic = "force-dynamic";
const toastOptions: Object = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const NotesIdPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = params;

  const [note, setNote] = useState<Notes>();

  // get notes
  const getNotes = async () => {
    const res = await axios.get(`/api/notes/${id}`);
    const data = await res.data;
    if (!data) router.push("/notes");
    setNote(data);
  };

  useEffect(() => {
    if (id) {
      getNotes();
    }
  }, [id]);

  const handleDelete = async (id: String) => {
    try {
      const res = await axios.delete(`/api/notes/${id}`);
      const data = await res.data;
      router.push("/notes");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // @ts-ignore
      toast.success("Copied to clipboard", toastOptions);
    } catch (err) {
      console.log(err);
    }
  };

  // get notes by id

  return (
    <>
      <ToastContainer />
      <div className="mx-16 mt-8">
        <div className="flex justify-between">
          <p className=" text-5xl font-poppins font-bold ">{note?.Title}</p>
          <div className="flex justify-end pr-5 items-center ">
            <div className="flex gap-2">
              <Button
                style={{
                  cursor: "pointer",
                }}
                color="cyan"
                variant="soft"
                onClick={handleCopyLink}
              >
                {" "}
                <FaShareAlt /> Save
              </Button>

              <EditNotes id={id} getNotes={getNotes} note={note} />
              <Button
                variant="surface"
                color="red"
                onClick={() => handleDelete(id)}
                style={{
                  cursor: "pointer",
                }}
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
    </>
  );
};

export default NotesIdPage;
