import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TaskLoading = ({}) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className={` pt-5`}>
      <div className={` min-h-[40vh] pb-1 mb-5 rounded-lg `}>
        <div
          className={`flex justify-center rounded-md border border-x-black hover:border-y-black hover:border-x-white duration-300 transition-all ease-in-out  text-2xl font-poppins tracking-wider font-semibold py-2`}
        >
          {" "}
          <Skeleton />
        </div>
        <ul>
          {data.map((item) => {
            return (
              <li
                key={item}
                draggable
                className={`text-lg flex  items-center justify-between font-semibold font-poppins tracking-wider  my-3  px-3 py-2 rounded-lg mx-2`}
              >
                <span className="w-[70%]">
                  <Skeleton />
                </span>

                <span className="">
                  <span className="flex items-center justify-end  gap-2">
                    <Skeleton className="text-lg text-zinc-400" />
                    <Skeleton className="text-lg text-red-600" />
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

export default TaskLoading;
