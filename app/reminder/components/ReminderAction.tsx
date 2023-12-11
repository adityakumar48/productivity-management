import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaEye } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import DeleteReminder from "./DeleteReminder";
import { Reminder } from "@prisma/client";

interface Props {
  id: string;
  setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>;
}

const ReminderAction = ({ id, setReminders }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <span className="bg-green-400 text-white p-2 rounded-md">
        {" "}
        <FaEye onClick={() => console.log(id)} />
      </span>
      <span className="bg-purple-500 text-white p-2 rounded-md">
        {" "}
        <BsPencilSquare onClick={() => console.log(id)} />
      </span>
      <span className="bg-rose-500 text-white p-2 rounded-md">
        {" "}
        <DeleteReminder id={id} setReminders={setReminders} />
      </span>
    </div>
  );
};

export default ReminderAction;
