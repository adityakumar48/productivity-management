"use client";
import { Task } from "@prisma/client";
import { Badge, Button, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

interface Props {
  tasks: Task[];
  isLoading: boolean;
}

const LastTasks = ({ tasks, isLoading }: Props) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-poppins mb-5 font-semibold">Recent Tasks</h2>

      <Table.Root>
        <Table.Body>
          {isLoading && (
            <Table.Row>
              <Table.Cell>
                <Flex justify={"between"} wrap={"wrap"}>
                  <Flex direction={"column"} align={"start"} gap="2">
                    <Link className="text-md" href={`/`}>
                      Loading...
                    </Link>
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          )}
          {tasks?.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full h-[50vh]">
              <p className="text-xl font-bold font-poppins">No Tasks Found</p>
              <p className="text-md font-poppins mb-2">
                Create a new Task to get started
              </p>
              <Button variant="soft" color="purple">
                <Link
                  href={"/"}
                  className="text-md 
                  font-poppins"
                >
                  Create Task
                </Link>
              </Button>
            </div>
          )}

          {tasks &&
            tasks?.map((item, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <Flex justify={"between"} wrap={"wrap"}>
                    <Flex direction={"column"} align={"start"} gap="2">
                      <Link className="text-md" href={`/`}>
                        {item.Task}
                      </Link>
                      {/* {item.Status === "COMPLETED" ? (
                      <Badge className="text-sm text-green-500">
                        {item.Status}
                      </Badge>
                    ) : (
                      <Badge className="text-sm text-red-500">
                        {item.Status}
                      </Badge>
                    )} */}

                      <Badge className="text-sm text-neutral-500">
                        {item.Status}
                      </Badge>
                    </Flex>
                    <Flex direction={"column"} align={"end"} gap="2">
                      <p className="text-sm text-neutral-500">
                        <span className="font-poppins font-semibold">
                          Created At:-{" "}
                        </span>
                        {item.createdAt
                          .toLocaleString()
                          .split("T")[1]
                          .split(".")[0] +
                          " " +
                          item.createdAt.toLocaleString().split("T")[0]}
                      </p>
                      <p className="text-sm text-neutral-500">
                        <span className=" text-violet-500 font-poppins font-semibold">
                          Updated At:-{" "}
                        </span>
                        {item.updatedAt
                          .toLocaleString()
                          .split("T")[1]
                          .split(".")[0] +
                          " " +
                          item.updatedAt.toLocaleString().split("T")[0]}
                      </p>
                    </Flex>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LastTasks;
