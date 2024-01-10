"use client";
import { Notes } from "@prisma/client";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaDownload, FaPlus } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import SimpleMDE from "react-simplemde-editor";

import axios from "axios";

interface Props {
  item: Notes;
  newCard?: boolean;
  getNotes?: () => void;
}

const NotesCard = ({ item, newCard, getNotes }: Props) => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleRoutingClick = () => {
    console.log("clicked");
    router.push(`/notes/${item.id}`);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/notes", {
        title,
        content,
      });
      const data = await res.data;
      console.log(data);

      setTitle("");
      setContent("");
      // router.push("/notes");
      // router.refresh();
      // @ts-ignore
      getNotes();
    } catch (err) {
      console.log(err);
      router.push("/notes");
    }
  };

  return (
    <>
      {newCard ? (
        <div className="w-[20rem] mt-5">
          <Dialog.Root>
            <Dialog.Trigger>
              <div className="p-5 cursor-pointer bg-neutral-200 rounded-xl min-h-[20rem] flex flex-col items-center justify-center ">
                <h1 className="flex flex-col items-center font-bold text-xl justify-center opacity-40">
                  <FaPlus /> <span>CREATE NEW</span>
                </h1>
              </div>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 600 }}>
              <Dialog.Title>Create Note</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Create a new Note...
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text size="2" mb="1" weight="bold">
                    Title
                  </Text>
                  <TextField.Input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Enter your note..."
                  />
                </label>
                <label>
                  <Text size="2" mb="1" weight="bold">
                    Content
                  </Text>
                  <SimpleMDE
                    // onChange={(e) => setContent(e.target.value)}
                    value={content}
                    onChange={(e) => setContent(e)}
                    className="border  "
                    placeholder="Enter your note description..."
                  />
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button
                    variant="solid"
                    type="submit"
                    color="purple"
                    className="bg-purple-400"
                    onClick={() => handleSubmit()}
                  >
                    Create
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      ) : (
        <div className="w-[20rem]  mt-5 cursor-pointer ">
          <div className="p-5 bg-neutral-200 min-h-[16rem] h-[16rem] rounded-t-xl  ">
            <h2 className="text-xl font-bold tracking-wide font-poppins pb-5">
              {item.Title}
            </h2>
            <div onClick={handleRoutingClick}>
              <ReactMarkdown className="font-poppins">
                {item.Content.length > 150
                  ? item.Content.slice(0, 150) + " ..."
                  : item.Content}

                {/* {item.Content} */}
              </ReactMarkdown>
            </div>
          </div>
          <div className=" bg-neutral-500 rounded-b-xl h-10 w-full">
            {/* Buttons */}
            <div className=" flex gap-4 text-md justify-end pr-8 items-center h-10">
              <p className=" p-1.5 bg-green-400 rounded-md text-white">
                <FaEdit />
              </p>
              <p className=" p-1.5 bg-red-400 rounded-md text-white">
                <MdDeleteForever />
              </p>
              <p className=" p-1.5 bg-purple-400 rounded-md text-white">
                <FaDownload />
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotesCard;
