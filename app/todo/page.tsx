"use client";
import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import ShowTask from "./ShowTask";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Task } from "@prisma/client";

const TodoHomepage = () => {
  const [userId, setUserId] = useState<string>("");
  const [refresh, setRefresh] = useState(false);
  const { data: session } = useSession();
  const [data, setData] = useState<Task[]>([]);

  let email = session?.user?.email;

  useEffect(() => {
    fetchUser();
  }, [refresh]);

  const fetchUser = async () => {
    const res = await axios.get(`/api/users/${email}`);
    setUserId(res.data.id);
    fetchTask(res.data.id);
  };

  const fetchTask = async (id: { id: string }) => {
    const res = await axios.get(`/api/tasks/${id}`);
    setData(res.data);
    setRefresh(true);
  };

  return (
    <div className="px-16 pt-2">
      <h1 className="font-poppins text-4xl font-bold">Tasks</h1>
      <p className="pl-1 text-gray-400">
        {" "}
        Write and manage your tasks easily...{" "}
      </p>
      <div>
        <CreateTask
          setRefresh={setRefresh}
          setUserId={setUserId}
          userId={userId}
        />
        <hr className="mt-10 w-[70%] mx-auto " />
      </div>
      <ShowTask
        refresh={refresh}
        data={data}
        setData={setData}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default TodoHomepage;
