"use client";
import { Task } from "@prisma/client";
import { Text } from "@radix-ui/themes";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BiRightArrowCircle } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
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
  setRefresh,
  refresh,
}: Props) => {
  useEffect(() => {
    setRefresh(false);
  }, [refresh]);

  // @ts-ignore
  const TimeStop = async ({ id }: { id: number }) => {
    setRefresh(false);
    const res = await axios.put(`/api/tasks/${id}`);
    setRefresh(true);
  };

  const GotoProcessing = async ({ id }: { id: number }) => {
    setRefresh(false);
    const res = await axios.patch(`/api/tasks/${id}`);
    setRefresh(true);
    setRefresh(false);
    const res2 = await axios.post(`/api/tasks/${id}`);
    setRefresh(true);
  };

  const onDelte = async (id: number) => {
    setRefresh(false);
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
                          onClick={() => TimeStop({ id: item.id })}
                          className="text-lg text-green-600"
                        />
                      ) : (
                        <BiRightArrowCircle
                          onClick={() => GotoProcessing({ id: item.id })}
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
