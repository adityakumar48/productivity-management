import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  loadingCards: number;
}

const NoteLoading = ({ loadingCards }: Props) => {
  return (
    <div className="rounded-xl pt-2 gap-5  justify-center items-center mx-auto md:mx-0 md:flex md:mb-0 mb-5">
      {Array(loadingCards)
        .fill(0)
        .map((_, i) => (
          <div key={i} className=" md:py-0 py-2 ">
            <Skeleton
              width={"20rem"}
              height={"18rem"}
              className="rounded-3xl"
            />
          </div>
        ))}
    </div>
  );
};

export default NoteLoading;
