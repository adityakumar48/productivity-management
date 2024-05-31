"use client";
import { Task, TaskStatus } from "@prisma/client";
import { Text } from "@radix-ui/themes";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiRightArrowCircle, BiSolidSave } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DeleteTask from "./DeleteTask";
import OpenModal from "./OpenModal";
import { useAppDispatch } from "../redux/hooks";
import { changeStatus } from "../redux/slices/tasks";
import { IoPauseCircleOutline } from "react-icons/io5";

export const dynamic = "force-dynamic";

interface Props {
  data: Task[];
  className?: string;
  title: string;
  primaryColor?: string;
  cardBgColor?: string;
  textBgColor?: string;
  setData?: Dispatch<SetStateAction<Task[]>>;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  fetchTask: () => void;
}

interface timers {
  id: number;
  elapsedTime: string;
  Status: TaskStatus;
  Task: string;
  Time: string;
  loading: boolean;
  createdAt: string;
  fetchTask: () => void;
  description: string;
  priority: string;
}

const Column = ({
  fetchTask,
  data,
  className,
  title,
  primaryColor,
  cardBgColor,
  textBgColor,
  setData,
  loading,
}: Props) => {
  const [timers, setTimers] = useState<timers[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  // Checking time difference
  useEffect(() => {
    const updateTimers = () => {
      if (!isPaused) {
        const currentTime = new Date().getTime();

        const updatedTimers = data.map((item) => {
          if (item.Status === "IN_PROCESSING") {
            const itemTime = parseInt(item.Time, 10);
            const elapsedTime = isPaused
              ? currentTime - startTime! // Use stored start time when paused
              : currentTime - itemTime;

            const hours = Math.floor(elapsedTime / 3600000);
            const minutes = Math.floor((elapsedTime % 3600000) / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);

            return {
              ...item,
              elapsedTime: `${String(hours).padStart(2, "0")}:${String(
                minutes
              ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
            };
          }

          return item;
        });
        // @ts-ignore
        setTimers(updatedTimers);
      } else {
        setStartTime(new Date().getTime());
      }
    };
    const intervalId = setInterval(updateTimers, 1000);

    return () => clearInterval(intervalId);
  }, [data, isPaused]);

  const [click, setClick] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // @ts-ignore
  const TimeStop = async ({ id, time }: { id: number; time: string }) => {
    dispatch(
      changeStatus({
        id,
        status: "COMPLETED",
        time: time,
      })
    );
    const res = await axios.post(`/api/tasks/${id}?status=COMPLETED`, {
      Time: time,
    });
  };

  const GotoProcessing = async ({ id }: { id: number }) => {
    // @ts-ignore
    dispatch(
      changeStatus({
        id,
        status: "IN_PROCESSING",
        time: new Date().getTime().toString(),
      })
    );

    const res = await axios.post(`/api/tasks/${id}?status=IN_PROCESSING`);
  };

  const markAsCompleted = async ({ id }: { id: number }) => {
    // @ts-ignore
    setData((prev) => {
      return prev?.filter((item) => item.id !== id);
    });
    const res = await axios.post(`/api/tasks/${id}?status=MARK_AS_COMPLETED`);
  };

  const handlePause = () => {
    setIsPaused(!isPaused); // Toggle paused state
  };
  return (
    <div className={`${className} pt-5`}>
      <div className={` min-h-[40vh] pb-1 mb-5 rounded-lg ${cardBgColor}`}>
        <Text
          className={`flex justify-center rounded-md ${primaryColor} border border-x-black hover:border-y-black hover:border-x-white duration-300 transition-all ease-in-out  text-2xl font-poppins tracking-wider font-semibold py-2`}
        >
          {" "}
          {title}
        </Text>

        <ul className="px-2">
          {timers.map((item) => {
            return loading == true ? (
              <li key={item.id}>
                <Skeleton className="my-2 py-2 rounded-lg " />
              </li>
            ) : (
              <li
                key={item.id}
                className={` text-neutral-700 flex  items-center justify-between font-semibold font-poppins tracking-wider ${textBgColor} my-3 px-3 py-2 rounded-lg `}
              >
                <span className="w-full">
                  <span className="flex items-center justify-between  w-full">
                    <h4 className="w-[70%] ">{item.Task}</h4>
                    <span className="flex-wrap gap-2 flex flex-row">
                      {item.Status === "TASK" && (
                        <>
                          <OpenModal
                            click={click}
                            item={item}
                            setData={setData}
                          />
                          <DeleteTask
                            // @ts-ignore
                            setData={setData}
                            taskId={item.id}
                            click={click}
                            fetchTask={fetchTask}
                          />
                          <BiRightArrowCircle
                            className={`${
                              click ? " cursor-not-allowed" : ""
                            }text-lg  cursor-pointer`}
                            onClick={() => GotoProcessing({ id: item.id })}
                          />
                        </>
                      )}
                      {item.Status === "IN_PROCESSING" && (
                        <>
                          <OpenModal
                            click={click}
                            item={item}
                            setData={setData}
                          />

                          <IoPauseCircleOutline
                            onClick={handlePause}
                            className={`${
                              click ? " cursor-not-allowed" : ""
                            }text-lg  cursor-pointer`}
                          />

                          <DeleteTask
                            // @ts-ignore
                            setData={setData}
                            taskId={item.id}
                            click={click}
                            fetchTask={fetchTask}
                          />
                          <BiRightArrowCircle
                            onClick={() =>
                              TimeStop({ id: item.id, time: item.elapsedTime })
                            }
                            className={`${
                              click ? " cursor-not-allowed" : ""
                            }text-lg  cursor-pointer`}
                          />
                        </>
                      )}
                      {item.Status === "COMPLETED" && (
                        <>
                          <OpenModal
                            click={click}
                            item={item}
                            setData={setData}
                          />
                          <DeleteTask
                            // @ts-ignore
                            setData={setData}
                            taskId={item.id}
                            click={click}
                            fetchTask={fetchTask}
                          />
                          <BiSolidSave
                            onClick={() => markAsCompleted({ id: item.id })}
                            className={`${
                              click ? " cursor-not-allowed" : ""
                            }text-lg  cursor-pointer`}
                          />
                        </>
                      )}
                    </span>
                    {/* <IconList status={item.Status} /> */}
                  </span>
                  <hr className="my-1 border-neutral-300" />
                  <span className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-500 ">
                      {item.createdAt.split("T")[0]}
                    </span>
                    {item.Status === "IN_PROCESSING" && (
                      <span className="text-[11px]">{item.elapsedTime}</span>
                    )}
                    {item.Status === "COMPLETED" && (
                      <span className="text-[11px]">{item.Time}</span>
                    )}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Column;
