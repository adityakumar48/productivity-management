"use client";
import React, { useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import Column from "./Column";

const ShowTask = () => {
  const data = [
    {
      id: 1,
      title: "Task 1",
      status: "todo",
    },

    {
      id: 2,
      title: "Task 2",
      status: "todo",
    },
    {
      id: 3,
      title: "Task 3",
      status: "pending",
    },
    {
      id: 4,
      title: "Task 4",
      status: "completed",
    },
  ];

  const todoItems = data.filter((item) => item.status === "todo");
  const pendingItems = data.filter((item) => item.status === "pending");
  const completedItems = data.filter((item) => item.status === "completed");

  return (
    <div>
      <div className="pt-10">
        <h1 className="text-2xl  font-poppins font-bold hover:underline duration-300 ease-in-out transition-all">
          Tasks List{" "}
        </h1>
      </div>

      <div className="flex w-full">
        <Column
          data={todoItems}
          className="w-1/4 px-4"
          title="Todo"
          primaryColor="text-gray-200 bg-slate-400"
          cardBgColor="bg-slate-200"
          textBgColor="bg-slate-300"
        />
        <Column
          data={pendingItems}
          className="w-1/4 px-4"
          title="Pending"
          primaryColor="text-gray-700 bg-rose-200"
          cardBgColor="bg-rose-100"
          textBgColor="bg-rose-200"
        />
        <Column
          data={completedItems}
          className="w-1/4 px-4"
          title="Completed"
          primaryColor="text-gray-700  bg-purple-300"
          cardBgColor="bg-purple-100"
          textBgColor="bg-purple-200"
        />
      </div>
    </div>
  );
};

export default ShowTask;
