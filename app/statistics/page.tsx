"use client";
import { Card, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import LastTasks from "./components/LastTasks";
import axios from "axios";
import { Task } from "@prisma/client";

export const dynamic = "force-dynamic";

const SatisticsPage = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTasks = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/statistics");
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

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="md:px-16 px-8 mt-8">
      <div className="md:flex gap-2  text-neutral-800 justify-between px-8">
        <Card style={{ width: 200, height: 140, marginBottom: 20 }}>
          <Flex
            direction="column"
            align={"center"}
            height={"100%"}
            justify={"center"}
          >
            <Text className="text-2xl font-poppins  ">4</Text>
            <Text className="text-2xl font-poppins font-semibold ">Tasks</Text>
          </Flex>
        </Card>
        <Card style={{ width: 200, height: 140, marginBottom: 20 }}>
          <Flex
            direction="column"
            align={"center"}
            height={"100%"}
            justify={"center"}
          >
            <Text className="text-2xl font-poppins  ">4</Text>
            <Text className="text-2xl font-poppins font-semibold ">Notes</Text>
          </Flex>
        </Card>
        <Card style={{ width: 200, height: 140, marginBottom: 20 }}>
          <Flex
            direction="column"
            align={"center"}
            height={"100%"}
            justify={"center"}
          >
            <Text className="text-2xl font-poppins  ">4</Text>
            <Text className="text-2xl font-poppins font-semibold ">
              Reminders
            </Text>
          </Flex>
        </Card>
        <Card style={{ width: 200, height: 140, marginBottom: 20 }}>
          <Flex
            direction="column"
            align={"center"}
            height={"100%"}
            justify={"center"}
          >
            <Text className="text-2xl font-poppins  ">14 min.</Text>
            <Text className="text-2xl font-poppins font-semibold ">
              Today Time
            </Text>
          </Flex>
        </Card>
      </div>

      <LastTasks tasks={tasks as Task[]} isLoading={isLoading} />
    </div>
  );
};

export default SatisticsPage;
