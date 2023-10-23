"use client";
import React, { useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import Column from "./Column";

const ShowTask = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title: "Task 1",
      status: "todo",
      time: "0",
    },

    {
      id: 2,
      title: "Task 2",
      status: "todo",
      time: "0",
    },
    {
      id: 3,
      title: "Task 3",
      status: "processing",
      time: "0",
    },
    {
      id: 5,
      title: "Task 5",
      status: "processing",
      time: "0",
    },
    {
      id: 4,
      title: "Task 4",
      status: "completed",
      time: "00h:05m:36s",
    },
  ]);

  const todoItems = data.filter((item) => item.status === "todo");
  const processingItems = data.filter((item) => item.status === "processing");
  const completedItems = data.filter((item) => item.status === "completed");

  return (
    <div>
      <div className="pt-10">
        <h1 className="text-2xl  font-poppins font-bold hover:underline duration-300 ease-in-out transition-all">
          Tasks List{" "}
        </h1>
      </div>

      <div className="flex w-[90%]">
        <Column
          data={todoItems}
          setData={setData}
          className="w-1/3 px-4"
          title="Todo"
          primaryColor="text-gray-200 bg-slate-400"
          cardBgColor="bg-slate-200"
          textBgColor="bg-slate-300"
        />
        <Column
          data={processingItems}
          setData={setData}
          className="w-1/3 px-4"
          title="Processing"
          primaryColor="text-neutral-600 bg-rose-200"
          cardBgColor="bg-rose-100"
          textBgColor="bg-rose-200"
        />
        <Column
          data={completedItems}
          setData={setData}
          className="w-1/3 px-4"
          title="Completed"
          primaryColor="text-neutral-600  bg-purple-300"
          cardBgColor="bg-purple-100"
          textBgColor="bg-purple-200"
        />
      </div>
    </div>
  );
};

export default ShowTask;
