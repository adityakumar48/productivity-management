import { Reminder } from "@prisma/client";
import { AlertDialog, Flex, Button } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

interface Props {
  id: string;
  setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>;
}

const DeleteReminder = ({ id, setReminders }: Props) => {
  const [click, setClick] = useState<boolean>(false);

  const onDelete = async (id: string) => {
    setClick(true);
    setReminders((prev) => {
      return prev.filter((item) => item.id !== id);
    });

    setClick(false);

    // Send Delete Request
    const res = await axios.delete(`/api/reminder/${id}`);
    console.log(res);
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="text-lg cursor-pointer">
        <MdDeleteForever
          className={`${
            click ? " cursor-not-allowed" : ""
          } text-lg  cursor-pointer`}
        />
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are You Sure you want to delete this reminder? This action is undone.
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
              onClick={() => onDelete(String(id))}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteReminder;
