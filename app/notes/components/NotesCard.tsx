"use client";
import React, { useState } from "react";
import { FaDownload, FaPlus } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";

const NotesCard = ({ newCard }: { newCard?: boolean }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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

            <Dialog.Content style={{ maxWidth: 450 }}>
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
                    Description
                  </Text>
                  <TextArea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    rows={5}
                    className="border "
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
                    onClick={() => {
                      // @ts-ignore
                      handleSubmit();
                    }}
                  >
                    Create
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      ) : (
        <div className="w-[20rem] mt-5">
          <div className="p-5 bg-neutral-200 rounded-t-xl min-h-[16rem] ">
            <h2 className="text-xl font-bold tracking-wide font-poppins pb-5">
              Title
            </h2>
            <div>
              <p className="font-poppins">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
                mollitia consequuntur cumque illum fugit dolorem odio, a sit
                deserunt obcaecati, numquam magnam corrupti. Sapiente laborum
                sint odit nobis modi repudiandae? lore
              </p>
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
