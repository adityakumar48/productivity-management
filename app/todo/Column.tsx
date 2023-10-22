import { Text } from "@radix-ui/themes";
import React from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

interface Props {
  data: {
    id: number;
    title: string;
    status: string;
  }[];
  className?: string;
  title: string;
  primaryColor?: string;
  cardBgColor?: string;
  textBgColor?: string;
}

const Column = ({
  data,
  className,
  title,
  primaryColor,
  cardBgColor,
  textBgColor,
}: Props) => {
  return (
    <div className={`${className} pt-5`}>
      <div className={` min-h-[40vh]    rounded-lg ${cardBgColor}`}>
        <Text
          className={`flex justify-center  ${primaryColor} border border-x-black hover:border-y-black hover:border-x-white duration-300 transition-all ease-in-out  text-2xl font-poppins tracking-wider font-bold py-1`}
        >
          {" "}
          {title}
        </Text>

        <ul>
          {data.map((item) => {
            return (
              <li
                key={item.id}
                className={`text-lg flex items-center justify-between font-semibold font-poppins tracking-wider ${textBgColor} my-3 px-3 py-2 rounded-lg mx-2`}
              >
                {item.title}

                <span className="flex items-center gap-2">
                  <FiEdit className="text-lg text-zinc-400 " />
                  <AiOutlineMinusCircle className="text-lg text-red-600  " />
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
