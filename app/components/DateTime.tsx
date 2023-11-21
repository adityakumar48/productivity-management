"use client";
import { useEffect, useState } from "react";

const DateTime = () => {
  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const time = date.toLocaleTimeString();
      const dateStr = date.toDateString();
      setDate(dateStr);
      setTime(time);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="font-poppins text-sm font-bold tracking-wider">{date}</p>
      <p className="font-poppins  text-sm"> {time} </p>
    </div>
  );
};

export default DateTime;
