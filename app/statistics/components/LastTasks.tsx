"use client";
import { Task, TaskStatus } from "@prisma/client";
import { Badge, Flex, Table } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const LastTasks = () => {
  const [tasks, setTasks] = useState<Task[]>();

  const getTasks = async () => {
    const res = await axios.get("/api/statistics");
    const data = await res.data;
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-poppins mb-5 font-semibold">Recent Tasks</h2>

      <Table.Root>
        <Table.Body>
          {tasks?.map((item, i) => (
            <Table.Row key={i}>
              <Table.Cell>
                <Flex justify={"between"}>
                  <Flex direction={"column"} align={"start"} gap="2">
                    <Link className="text-md" href={`/`}>
                      {item.Task}
                    </Link>
                    {item.Status === "COMPLETED" ? (
                      <Badge className="text-sm text-green-500">
                        {item.Status}
                      </Badge>
                    ) : (
                      <Badge className="text-sm text-red-500">
                        {item.Status}
                      </Badge>
                    )}

                    {/* <Badge className="text-sm text-neutral-500">
                      {item.Status}
                    </Badge> */}
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
