import { Badge, Table } from "@radix-ui/themes";
import { BsPencilSquare } from "react-icons/bs";
import { FaEye } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

const ShowAllReminder = () => {
  return (
    <div className="mt-4">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>S. no.</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>1</Table.RowHeaderCell>
            <Table.Cell>Tatkal Ticket</Table.Cell>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>10:00</Table.Cell>
            <Table.Cell>
              <Badge color="purple">Pending</Badge>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-3">
                <span className="bg-green-400 text-white p-2 rounded-md">
                  {" "}
                  <FaEye />
                </span>
                <span className="bg-purple-500 text-white p-2 rounded-md">
                  {" "}
                  <BsPencilSquare />
                </span>
                <span className="bg-rose-500 text-white p-2 rounded-md">
                  {" "}
                  <MdDeleteForever />
                </span>
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default ShowAllReminder;
