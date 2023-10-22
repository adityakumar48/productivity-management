import React from "react";
import CreateTask from "./CreateTask";

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
      </div>
    </div>
  );
};

export default TodoHomepage;
