"use client";
import { Task } from "@prisma/client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";

export const dynamic = "force-dynamic";

const DeleteTask = ({
  setData,
  taskId,
  click,
}: {
  taskId: number;
  fetchTask: () => void;
  click: boolean;
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const onDelete = async (id: number) => {
    setData((prev) => {
      return prev.filter((item) => item.id !== id);
    });

    // Send Delete Request
    const res = await axios.delete(`/api/tasks/${id}`);
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="text-lg cursor-pointer">
        <AiOutlineMinusCircle
          className={`${
            click ? " cursor-not-allowed" : ""
          } text-lg  cursor-pointer`}
        />
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are You Sure you want to delete this task? This action is undone.
        </AlertDialog.Description>
        <Flex mt="4" gap="2">
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              color="red"
              className={`bg-rose-500 hover:bg-rose-700 cursor-pointer font-poppins text-white px-3 py-3 rounded-md  `}
              onClick={() => onDelete(taskId)}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteTask;
