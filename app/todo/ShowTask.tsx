"use client";
import React, { useEffect, useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import Column from "./Column";
import axios from "axios";
import { Prisma, Task, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import TaskLoading from "./TaskLoading";

interface Props {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowTask = ({ refresh, setRefresh }: Props) => {
  const { data: session } = useSession();
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    fetchTask();
    setRefresh(false);
  }, [refresh]);

  const fetchTask = async () => {
    const email = session?.user?.email;
    const res = await axios.patch(`/api/tasks`, { email });
    setData(res.data);
  };

  const todoItems = data?.filter((item) => item.Status === "todo");
  const processingItems = data?.filter((item) => item.Status === "processing");
  const completedItems = data?.filter((item) => item.Status === "completed");
  return (
    <div className="h-auto">
      <div className="pt-10">
        <h1 className="text-2xl  font-poppins font-bold hover:underline duration-300 ease-in-out transition-all">
          Tasks List{" "}
        </h1>
      </div>

      <div className="md:flex  md:w-[90%] pb-16">
        <Column
          refresh={refresh}
          setRefresh={setRefresh}
          data={todoItems}
          setData={setData}
          className="md:w-1/3 px-4"
          title="Task"
          primaryColor="text-gray-200 bg-slate-400"
          cardBgColor="bg-slate-200"
          textBgColor="bg-slate-300"
        />
        <Column
          refresh={refresh}
          setRefresh={setRefresh}
          data={processingItems}
          setData={setData}
          className="md:w-1/3 px-4"
          title="Processing"
          primaryColor="text-neutral-600 bg-rose-200"
          cardBgColor="bg-rose-100"
          textBgColor="bg-rose-200"
        />
        <Column
          refresh={refresh}
          setRefresh={setRefresh}
          data={completedItems}
          setData={setData}
          className="md:w-1/3 px-4"
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
