import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import LastTasks from "./components/LastTasks";

const page = () => {
  return (
    <div className="md:px-16 px-8 mt-8">
      <div className="flex gap-2 text-neutral-800 justify-between px-8">
        <Card style={{ width: 200, height: 140 }}>
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
        <Card style={{ width: 200, height: 140 }}>
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
        <Card style={{ width: 200, height: 140 }}>
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
        <Card style={{ width: 200, height: 140 }}>
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

      <LastTasks />
    </div>
  );
};

export default page;
