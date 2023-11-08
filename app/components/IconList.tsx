import { TaskStatus } from "@prisma/client";
import React from "react";
import { AiFillEye, AiOutlineMinusCircle } from "react-icons/ai";
import { BiRightArrowCircle } from "react-icons/bi";

const IconList = ({ status }: { status: TaskStatus }) => {
  if (status === "TASK") {
    return (
      <span className="flex items-center justify-end  gap-2">
        <AiFillEye
          className="text-lg text-zinc-400"
          onClick={() => console.log("Click eye btn")}
        />
        <AiOutlineMinusCircle
          className="text-lg text-red-600"
          onClick={() => console.log("Click minus btn")}
        />
      </span>
    );
  }

  return <div>IconList</div>;
};

export default IconList;
