"use client";
import { Text } from "@radix-ui/themes";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BiRightArrowCircle } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

interface Props {
  data: {
    id: number;
    title: string;
    status: string;
    time: string;
  }[];
  className?: string;
  title: string;
  primaryColor?: string;
  cardBgColor?: string;
  textBgColor?: string;
  setData?: Dispatch<
    SetStateAction<
      { id: number; title: string; status: string; time: string }[]
    >
  >;
}

const Column = ({
  data,
  className,
  title,
  primaryColor,
  cardBgColor,
  textBgColor,
  setData,
}: Props) => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [totalTime, setTotalTime] = useState(0);

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
        if (item.status === "processing") {
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
          return { ...item, status: "completed" };
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
          return { ...item, status: "processing" };
        }
        return item;
      });
    });
  };

  return (
    <div className={`${className} pt-5`}>
      <div className={` min-h-[40vh] rounded-lg ${cardBgColor}`}>
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
                className={`text-lg flex items-center justify-between font-semibold font-poppins tracking-wider ${textBgColor} my-3 px-3 py-2 rounded-lg mx-2`}
              >
                {item.title}

                <span className="">
                  <span className="flex items-center justify-end  gap-2">
                    <FiEdit className="text-lg text-zinc-400" />
                    <AiOutlineMinusCircle className="text-lg text-red-600  " />
                    {item.status !== "completed" ? (
                      item.status === "processing" ? (
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
                  {item.status === "completed" ? (
                    item.time === "0" ? null : (
                      <span className="text-xs">{item.time}</span>
                    )
                  ) : null}

                  {/* Processing Time */}
                  {item.status === "processing" ? (
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
