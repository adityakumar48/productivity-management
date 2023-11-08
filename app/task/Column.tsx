"use client";
import { Task, TaskStatus } from "@prisma/client";
import { Text } from "@radix-ui/themes";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiFillEye, AiOutlineMinusCircle } from "react-icons/ai";
import { BiRightArrowCircle, BiSolidSave } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
}

interface timers {
  id: number;
  elapsedTime: string;
  Status: TaskStatus;
  Task: string;
  Time: string;
  loading: boolean;
  createdAt: string;
}

const Column = ({
  data,
  className,
  title,
  primaryColor,
  cardBgColor,
  textBgColor,
  setRefresh,
  loading,
}: Props) => {
  const [timers, setTimers] = useState<timers[]>([]);
  useEffect(() => {
    const updateTimers = () => {
      const currentTime = new Date().getTime();

      const updatedTimers = data.map((item) => {
        if (item.Status === "IN_PROCESSING") {
          const itemTime = parseInt(item.Time, 10);
          const elapsedTime = currentTime - itemTime;

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
    };

    const intervalId = setInterval(updateTimers, 1000);

    return () => clearInterval(intervalId);
  }, [data]);

  const [click, setClick] = useState<boolean>(false);
  // @ts-ignore
  const TimeStop = async ({ id, time }: { id: number; time: string }) => {
    const res = await axios.put(`/api/tasks/${id}`, {
      Time: time,
    });
    setRefresh(true);
  };

  const GotoProcessing = async ({ id }: { id: number }) => {
    setClick(true);
    const res = await axios.patch(`/api/tasks/${id}`);
    // const res2 = await axios.post(`/api/tasks/${id}`);

    setRefresh(true);
    setClick(false);
  };

  // console.log(timeDifference());

  const onDelete = async (id: number) => {
    // Confirmation Modal Needed

    // Send Delete Reques
    setRefresh(false);
    const res = await axios.delete(`/api/tasks/${id}`);
    setRefresh(true);
  };

  const markAsCompleted = async ({ id }: { id: number }) => {
    console.log(id);
    const res = await axios.post(`/api/tasks/${id}`);
    setRefresh(true);
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
                draggable
                className={` text-neutral-700 flex  items-center justify-between font-semibold font-poppins tracking-wider ${textBgColor} my-3 px-3 py-2 rounded-lg `}
              >
                <span className="w-full">
                  <span className="flex items-center justify-between  w-full">
                    <h4 className="w-[70%] ">{item.Task}</h4>
                    <span className="flex-wrap gap-2 flex flex-row">
                      {item.Status === "TASK" && (
                        <>
                          <AiFillEye
                            className={`${
                              click ? " cursor-not-allowed" : ""
                            }text-lg  cursor-pointer`}
                            onClick={() => console.log("Click eye btn")}
                          />
                          <AiOutlineMinusCircle
                            className={`${
                              click ? " cursor-not-allowed" : ""
                            }text-lg  cursor-pointer`}
                            onClick={() => onDelete(item.id)}
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
                          <AiFillEye
                            className={`${
                              click ? " cursor-not-allowed" : ""
                            }text-lg  cursor-pointer`}
                            onClick={() => console.log("Click eye btn")}
                          />
                          <AiOutlineMinusCircle
                            className={`${
                              click ? " cursor-not-allowed" : ""
                            }text-lg  cursor-pointer`}
                            onClick={() => onDelete(item.id)}
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
                          <AiFillEye
                            className={`${
                              click ? " cursor-not-allowed" : ""
                            }text-lg  cursor-pointer`}
                            onClick={() => console.log("Click eye btn")}
                          />
                          <AiOutlineMinusCircle
                            className={`${
                              click ? " cursor-not-allowed" : ""
                            }text-lg  cursor-pointer`}
                            onClick={() => onDelete(item.id)}
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
