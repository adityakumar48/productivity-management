import React from "react";
import Image from "next/image";

interface Props {
  linearGradientClass: string;
  title: string;
  image: any;
  description: string;
  shadowColor?: string;
}

const Card = ({
  linearGradientClass,
  title,
  image,
  shadowColor,
  description,
}: Props) => {
  return (
    <div
      className={`w-56 rounded-3xl py-4 my-4 px-4 shadow-md drop-shadow-xl ${shadowColor} text-white ${linearGradientClass}`}
    >
      <Image
        src={image}
        width={image.width}
        height={image.height}
        alt="CardImage"
        className="rounded-t-lg"
      />{" "}
      <h4 className="text-xl text-center mt-8 mb-2">{title}</h4>
      <p className="text-sm text-center ">{description}</p>
    </div>
  );
};

export default Card;
