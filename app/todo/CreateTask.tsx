"use client";
import prisma from "@/prisma/client";
import {
  Button,
  Callout,
  Flex,
  RadioGroup,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Spinner from "../components/Spinner";

interface Props {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<any>>;
  userId: string;
}

const CreateTask = ({ setRefresh, userId }: Props) => {
  const [click, setClick] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("todo");
  const [disable, setDisable] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const { data: session } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClick(true);
    setError("");
    setTask(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setDisable(true);
      const res = await axios.post("/api/tasks", {
        Task: task,
        Status: status,
        email: session?.user?.email,
      });

      setDisable(false);
      setTask("");
      setStatus("todo");
      setClick(false);
      setRefresh(true);
      router.push("/");
    } catch (error) {
      setError("An Unexpected error occured");
      setDisable(false);
    }
  };

  return (
    <div className={`pt-5  ${click ? " max-w-xl " : " "} `}>
      {error && (
        <Callout.Root color="red" className="mb-5 max-w-2xl">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <p className="mt-2 pl-1 text-sm tracking-wide text-gray-400">
        Add a task
      </p>
      <form
        onSubmit={handleSubmit}
        className={`${click ? "block" : "flex gap-2"}`}
      >
        <TextField.Root>
          <TextField.Input
            onChange={handleChange}
            value={task}
            className="border h-full w-full  outline-none rounded-md font-poppins text-gray-500 px-2 py-2"
            placeholder="Write Your tasks here..."
          />
        </TextField.Root>
        {click && (
          <>
            <p className="my-2 pl-1  text-sm tracking-wider text-gray-400">
              priority
            </p>
            <RadioGroup.Root
              variant="surface"
              className="pl-2"
              defaultValue="todo"
              size={"3"}
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

        <Button
          color="purple"
          type="submit"
          disabled={disable}
          size={"2"}
          mt={click ? "4" : "0"}
          className={`bg-purple-500 cursor-pointer font-poppins text-white px-3 py-2 rounded-md  `}
        >
          Add Task {disable && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default CreateTask;
