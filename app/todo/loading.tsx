import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssuesPage = () => {
  return (
    <div className="px-16 pt-2">
      <Skeleton />

      <div>
        <Skeleton />
        <hr className="mt-10 w-[70%] mx-auto " />
      </div>
      <Skeleton />
    </div>
  );
};

export default LoadingIssuesPage;
