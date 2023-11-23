"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Task, TaskStatus } from "@prisma/client";

interface Props {
  fetchTask: () => void;
  setData?: React.Dispatch<React.SetStateAction<Task[]>>;
}

const toastOptions: Object = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const dynamic = "force-dynamic";
const CreateTask = ({ fetchTask, setData }: Props) => {
  const [click, setClick] = useState<boolean>(false);
  const [status, setStatus] = useState<TaskStatus>("TASK");
  const [disable, setDisable] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClick(true);
    setTask(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setDisable(true);

      if (task === "") {
        toast.error("Task cannot be empty!", toastOptions);
        setDisable(false);
        return;
      }
      // @ts-ignore
      setData((prev) => {
        return [
          ...prev,
          {
            Task: task,
            Status: status,
            createdAt: new Date().toISOString(),
            id: Math.floor(Math.random() * 1000),
            Time: new Date().getTime().toString(),
          },
        ];
      });

      // Api Endpoint to add data
      const res = await axios.post("/api/tasks", {
        Task: task,
        Status: status,
      });

      if (res.status === 201) {
        toast.success("😀Task Added Successfully", toastOptions);
      }

      setDisable(false);
      setTask("");
      setStatus("TASK");
      setClick(false);
      fetchTask();
      router.push("/");
    } catch (error) {
      console.log(error);
      console.log(error);
      toast.error("An UnExpected Error Occurred!", toastOptions);
      setDisable(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={`pt-5  ${click ? " max-w-xl " : " "} `}>
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
    </>
  );
};

export default CreateTask;
