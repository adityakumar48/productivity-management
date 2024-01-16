"use client";
import { Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import LastTasks from "./components/LastTasks";
import axios from "axios";
import { Task } from "@prisma/client";
import Card from "./components/Card";

export const dynamic = "force-dynamic";

interface Statistics {
  taskCount: number;
  reminderCount: number;
  notesCount: number;
  completedTasks: number;
  completedTaskTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const SatisticsPage = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<Statistics>({
    taskCount: 0,
    reminderCount: 0,
    notesCount: 0,
    completedTasks: 0,
    completedTaskTime: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  });

  const getTasks = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/statistics/tasks");
      const data = (await res.data) as Task[];
      setTasks(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatistics = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/statistics");
      const data = await res.data;
      setStatistics(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStatistics();
    getTasks();
  }, []);

  return (
    <div className="md:px-16 px-8 mt-8">
      <div className=" md:flex mx-auto justify-center text-neutral-800  gap-5  ">
        <Card
          classname="bg-purple-50 hover:border-purple-400 text-xl "
          title="Tasks"
          item={statistics?.taskCount as any}
        />
        <Card
          classname="bg-teal-50 hover:border-teal-400 text-lg"
          title="Completed Tasks"
          item={statistics?.completedTasks as any}
        />
        <Card
          classname="bg-indigo-50 hover:border-indigo-400 text-xl"
          title="Notes"
          item={statistics?.notesCount as any}
        />
        <Card
          classname="bg-fuchsia-50 hover:border-fuchsia-400 text-xl"
          title="Reminders"
          item={statistics?.reminderCount as any}
        />
        <Card
          classname="bg-pink-50 hover:border-pink-400 text-lg"
          title="Total Task Time"
          item={
            `${statistics?.completedTaskTime.hours}h: ${statistics?.completedTaskTime.minutes}m: ${statistics?.completedTaskTime.seconds}s` as any
          }
        />
      </div>

      <LastTasks tasks={tasks as Task[]} isLoading={isLoading} />
    </div>
  );
};

export default SatisticsPage;
