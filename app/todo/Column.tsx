"use client";
import { Task } from "@prisma/client";
import { Text } from "@radix-ui/themes";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BiRightArrowCircle } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { TiTick } from "react-icons/ti";

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
  setRefresh,
  refresh,
}: Props) => {
  useEffect(() => {
    setRefresh(true);
  }, [refresh]);

  const [click, setClick] = useState<boolean>(false);

  // @ts-ignore
  const TimeStop = async ({ id }: { id: number }) => {
    const res = await await axios.put(`/api/tasks/${id}`);
    setRefresh(true);
  };

  const GotoProcessing = async ({ id }: { id: number }) => {
    setClick(true);
    const res = await axios.patch(`/api/tasks/${id}`);
    setRefresh(true);
    setRefresh(false);
    const res2 = await axios.post(`/api/tasks/${id}`);
    setRefresh(true);
    setClick(false);
  };

  const onDelte = async (id: number) => {
    const res = await axios.delete(`/api/tasks/${id}`);
    setRefresh(true);
  };

  const markAsCompleted = async ({ id }: { id: number }) => {
    console.log(id);
    console.log("Mark As Read");
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
                          onClick={() => TimeStop({ id: item.id })}
                          className={`${
                            click ? " cursor-not-allowed" : ""
                          }text-lg text-green-600 cursor-pointer`}
                        />
                      ) : (
                        <BiRightArrowCircle
                          onClick={() => GotoProcessing({ id: item.id })}
                          className={`${
                            click ? " cursor-not-allowed" : ""
                          } text-lg text-green-600 cursor-pointer`}
                        />
                      )
                    ) : (
                      <TiTick
                        onClick={() => markAsCompleted({ id: item.id })}
                        className={`${
                          click ? " cursor-not-allowed" : ""
                        } text-lg text-green-600 cursor-pointer`}
                      />
                    )}
                  </span>

                  {/* Completed Time */}
                  {item.Status === "completed" ? (
                    item.Time === "0" ? null : (
                      <span className="text-xs">{item.Time}</span>
                    )
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
