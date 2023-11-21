import prisma from "@/prisma/client";
import { Badge, Table } from "@radix-ui/themes";
import React from "react";

export const dynamic = "force-dynamic";

const HistoryFetch = async () => {
  const tasks = await prisma.task.findMany({
    where: {
      Status: "MARK_AS_COMPLETED",
    },
  });

  return (
    <div className="px-16 pt-16">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Task</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>{task.Task}</Table.Cell>
              <Table.Cell>
                <Badge color="violet">Completed</Badge>
              </Table.Cell>
              <Table.Cell>{task.createdAt.toDateString()}</Table.Cell>
              <Table.Cell>{task.Time}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default HistoryFetch;
