"use client";
import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import ShowTask from "./ShowTask";

const TodoHomepage = () => {
  const [userId, setUserId] = useState<string>("");
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="px-8 md:px-16 pt-2">
      <h1 className="font-poppins text-3xl md:text-4xl font-bold">Tasks</h1>
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
      <ShowTask refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
};

export default TodoHomepage;
