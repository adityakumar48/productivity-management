import React from "react";

interface Props {
  classname?: string;
  title: string;
  item?: string;
}

const Card = ({ classname, title, item }: Props) => {
  return (
    <div
      className={`w-48 h-48 border rounded-xl flex flex-col items-center justify-center text-neutral-600 transition-colors ease-in-out duration-300 cursor-pointer ${classname}`}
    >
      <p>{item}</p>
      <p>{title}</p>
    </div>
  );
};

export default Card;
