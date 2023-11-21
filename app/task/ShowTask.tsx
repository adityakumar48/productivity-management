"use client";
import { Task } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { GoHistory } from "react-icons/go";
import Column from "./Column";

interface Props {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  data: Task[];
  loading: boolean;
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
  fetchTask: () => void;
}

export const dynamic = "force-dynamic";

const ShowTask = ({
  refresh,
  loading,
  setRefresh,
  data,
  setData,
  fetchTask,
}: Props) => {
  const todoItems = data?.filter((item) => item.Status === "TASK");
  const processingItems = data?.filter(
    (item) => item.Status === "IN_PROCESSING"
  );
  const completedItems = data?.filter((item) => item.Status === "COMPLETED");

  return (
    <div className="h-auto">
      <div className="pt-10  flex-wrap flex items-center  justify-between">
        <h1 className="text-2xl font-poppins font-bold hover:underline duration-300 ease-in-out transition-all">
          Tasks List{" "}
        </h1>

        <Link
          href="/task/history"
          className="md:pr-32 py-2 flex items-center gap-2 text-neutral-500 "
        >
          <GoHistory className="text-lg " />
          <p>Completed Tasks</p>
        </Link>
      </div>

      <div className="md:flex md:w-[90%] pb-16">
        <Column
          fetchTask={fetchTask}
          refresh={refresh}
          setRefresh={setRefresh}
          data={todoItems}
          setData={setData}
          className="md:w-1/3 px-4"
          title="Task"
          primaryColor="text-gray-200 bg-slate-400"
          cardBgColor="bg-slate-200"
          textBgColor="bg-slate-300"
          loading={loading}
        />
        <Column
          fetchTask={fetchTask}
          refresh={refresh}
          setRefresh={setRefresh}
          data={processingItems}
          setData={setData}
          className="md:w-1/3 px-4"
          title="Processing"
          primaryColor="text-neutral-600 bg-rose-200"
          cardBgColor="bg-rose-100"
          textBgColor="bg-rose-200"
          loading={loading}
        />
        <Column
          fetchTask={fetchTask}
          refresh={refresh}
          setRefresh={setRefresh}
          data={completedItems}
          setData={setData}
          className="md:w-1/3 px-4"
          title="Completed"
          primaryColor="text-neutral-600  bg-purple-300"
          cardBgColor="bg-purple-100"
          textBgColor="bg-purple-200"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ShowTask;
