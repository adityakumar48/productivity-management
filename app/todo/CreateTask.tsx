"use client";
import { Button, Flex, RadioGroup, Text } from "@radix-ui/themes";
import axios from "axios";

import React, { useEffect, useState } from "react";

interface Props {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<any>>;
  userId: string;
}

const CreateTask = ({ setRefresh, userId }: Props) => {
  const [click, setClick] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("todo");
  const [task, setTask] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClick(true);
    setTask(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRefresh(false);
    const res = await axios.post("/api/tasks", {
      Task: task,
      Status: status,
      ProfileId: userId,
    });

    setRefresh(true);
    setTask("");
    setStatus("todo");
    setClick(false);
  };

  return (
    <form onSubmit={handleSubmit} className="pt-5 ">
      <p className="mt-2 pl-1 text-sm tracking-wide text-gray-400">
        Add a task
      </p>
      <input
        type="text"
        placeholder="Write Your tasks here..."
        onChange={handleChange}
        value={task}
        className={`border px-2  py-2 outline-none rounded-md  mr-2  ${
          click ? "w-[80%] transition-all ease-in-out duration-300 " : ""
        } `}
      />
      {/* Radio input box */}

      {click && (
        <>
          <p className="my-2 pl-1  text-sm tracking-wider text-gray-400">
            priority
          </p>
          <RadioGroup.Root
            variant="classic"
            className="pl-2"
            defaultValue="todo"
          >
            <Flex gap="2" direction="row">
              <Text as="label" size="2">
                <Flex gap="2">
                  <RadioGroup.Item
                    value="todo"
                    onClick={() => setStatus("todo")}
                  />{" "}
                  Todo
                </Flex>
              </Text>
              <Text as="label" size="2">
                <Flex gap="2">
                  <RadioGroup.Item
                    value="processing"
                    onClick={() => setStatus("processing")}
                  />{" "}
                  Processing
                </Flex>
              </Text>
              <Text as="label" size="2">
                <Flex gap="2">
                  <RadioGroup.Item
                    value="completed"
                    onClick={() => setStatus("completed")}
                  />{" "}
                  Completed
                </Flex>
              </Text>
            </Flex>
          </RadioGroup.Root>
        </>
      )}
      <button className="bg-purple-500 text-white px-3 py-2 rounded-md mt-3">
        Add Task
      </button>
    </form>
  );
};

export default CreateTask;
