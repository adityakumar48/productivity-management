"use client";
import { Task } from "@prisma/client";
import { Text } from "@radix-ui/themes";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BiRightArrowCircle } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";

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
}

const Column = ({
  data,
  className,
  title,
  primaryColor,
  cardBgColor,
  textBgColor,
  setData,
  refresh,
  setRefresh,
}: Props) => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  useEffect(() => {
    run();

    const interval = setInterval(run, 10);
    return () => clearInterval(interval);
  }, []);

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    // @ts-ignore
    setData((prev) => {
      return prev.map((item) => {
        if (item.Status === "processing") {
          return { ...item, time: `${updatedH}h:${updatedM}m:${updatedS}s` };
        }
        return item;
      });
    });

    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  // @ts-ignore
  const TimeStop = ({ taskId }: { taskId: number }) => {
    // @ts-ignore
    setData((prev) => {
      return prev.map((item) => {
        if (item?.id == taskId) {
          return { ...item, Status: "completed" };
        }
        return item;
      });
    });
  };

  const GotoProcessing = ({ taskId }: { taskId: number }) => {
    // @ts-ignore
    setData((prev) => {
      return prev.map((item) => {
        if (item?.id == taskId) {
          return { ...item, Status: "processing" };
        }
        return item;
      });
    });
  };

  const onDelte = async (id: number) => {
    const res = await axios.delete(`/api/tasks/${id}`);
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
        <ul>
          {data.map((item) => {
            return (
              <li
                key={item.id}
                draggable
                className={`text-lg flex  items-center justify-between font-semibold font-poppins tracking-wider ${textBgColor} my-3  px-3 py-2 rounded-lg mx-2`}
              >
                <span className="w-[70%]">{item.Task}</span>

                <span className="">
                  <span className="flex items-center justify-end  gap-2">
                    <FiEdit className="text-lg text-zinc-400" />
                    <AiOutlineMinusCircle
                      className="text-lg text-red-600"
                      onClick={() => onDelte(item.id)}
                    />
                    {item.Status !== "completed" ? (
                      item.Status === "processing" ? (
                        <BiRightArrowCircle
                          onClick={() => TimeStop({ taskId: item.id })}
                          className="text-lg text-green-600"
                        />
                      ) : (
                        <BiRightArrowCircle
                          onClick={() => GotoProcessing({ taskId: item.id })}
                          className="text-lg text-green-600"
                        />
                      )
                    ) : null}
                  </span>

                  {/* Completed Time */}
                  {item.Status === "completed" ? (
                    item.Time === "0" ? null : (
                      <span className="text-xs">{item.Time}</span>
                    )
                  ) : null}

                  {/* Processing Time */}
                  {item.Status === "processing" ? (
                    <>
                      <span className="text-xs">
                        {time.h >= 10 ? time.h : "0" + time.h}h:
                      </span>
                      <span className="text-xs">
                        {time.m >= 10 ? time.m : "0" + time.m}m:
                      </span>
                      <span className="text-xs">
                        {time.s >= 10 ? time.s : "0" + time.s}s
                      </span>
                    </>
                  ) : null}
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
