import React from "react";
import CreateTask from "./CreateTask";
import ShowTask from "./ShowTask";

const TodoHomepage = () => {
  return (
    <div className="px-16 pt-2">
      <h1 className="font-poppins text-4xl font-bold">Tasks</h1>
      <p className="pl-1 text-gray-400">
        {" "}
        Write and manage your tasks easily...{" "}
      </p>
      <div>
        <CreateTask />
        <hr className="mt-10 w-[70%] mx-auto " />
      </div>
      <ShowTask />
    </div>
  );
};

export default TodoHomepage;
