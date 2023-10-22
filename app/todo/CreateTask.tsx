"use client";
import { Flex, RadioGroup, Text } from "@radix-ui/themes";
import React, { useState } from "react";

const CreateTask = () => {
  const [click, setClick] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("todo");
  const [task, setTask] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClick(true);
    setTask(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(task, status);

    const data = {
      task,
      status,
    };
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
                    value="pending"
                    onClick={() => setStatus("pending")}
                  />{" "}
                  Pending
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
