import { Text } from "@radix-ui/themes";
import React from "react";

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
          className={`flex justify-center  ${primaryColor} text-2xl font-poppins font-bold pt-2`}
        >
          {" "}
          {title}
        </Text>

        <ul>
          {data.map((item) => {
            return (
              <li
                key={item.id}
                className={`text-lg font-semibold font-poppins tracking-wider ${textBgColor} my-3 px-3 py-2 rounded-lg mx-2`}
              >
                {item.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Column;
