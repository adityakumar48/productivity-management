"use client";
import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import ShowTask from "./ShowTask";
import { Task } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import tasks, {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
} from "../redux/slices/tasks";
export const dynamic = "force-dynamic";

const TodoHomepage = () => {
  const [refresh, setRefresh] = useState(false);
  const [localdata, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const data = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.patch("/api/tasks");
      dispatch(fetchTasksSuccess(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch(fetchTasksFailure(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(data);
  }, [dispatch]);

  return (
    <div className="px-8 md:px-16 pt-2">
      <h1 className="font-poppins text-3xl md:text-4xl font-bold">Tasks</h1>
      <p className="pl-1 text-gray-400">
        {" "}
        Write and manage your tasks easily...{" "}
      </p>
      <div>
        <CreateTask fetchTask={fetchData} setData={setData} />
        <hr className="mt-10 w-[70%] mx-auto " />
      </div>
      <ShowTask
        loading={loading}
        refresh={refresh}
        fetchTask={fetchData}
        setData={setData}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default TodoHomepage;
