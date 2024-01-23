import DeleteReminder from "@/app/reminder/components/DeleteReminder";
import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaEye } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

interface Props {
  id: string;
}

const UsersAction = ({ id }: Props) => {
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
        <MdDeleteForever />
      </span>
    </div>
  );
};

export default UsersAction;
