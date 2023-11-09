import prisma from "@/prisma/client";
import { Task } from "@prisma/client";
import React from "react";

const TasksFetch = async () => {
  const tasks: Task[] = await prisma.task.findMany({
    where: {
      Status: "TASK",
    },
  });

  return (
    <div>
      {tasks.map((task) => (
        <p key={task.id}>{task.Task}</p>
      ))}
    </div>
  );
};

export default TasksFetch;
