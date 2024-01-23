"use client";
import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import ShowTask from "./ShowTask";
import { Task } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
export const dynamic = "force-dynamic";

const TodoHomepage = () => {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Api Endpoint to fetch data
  const fetchTask = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/tasks`);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // For First Time Fetching Data
  useEffect(() => {
    router.refresh();
    fetchTask();
  }, []);

  return (
    <div className="px-8 md:px-16 pt-2">
      <h1 className="font-poppins text-3xl md:text-4xl font-bold">Tasks</h1>
      <p className="pl-1 text-gray-400">
        {" "}
        Write and manage your tasks easily...{" "}
      </p>
      <div>
        <CreateTask fetchTask={fetchTask} setData={setData} />
        <hr className="mt-10 w-[70%] mx-auto " />
      </div>
      <ShowTask
        loading={loading}
        refresh={refresh}
        data={data}
        fetchTask={fetchTask}
        setData={setData}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default TodoHomepage;
