"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";

const DeleteTask = ({
  taskId,
  fetchTask,
  click,
}: {
  taskId: number;
  fetchTask: () => void;
  click: boolean;
}) => {
  const onDelete = async (id: number) => {
    // Confirmation Modal Needed

    // Send Delete Request
    const res = await axios.delete(`/api/tasks/${id}`);
    fetchTask();
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
            <Button color="red" onClick={() => onDelete(taskId)}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteTask;
