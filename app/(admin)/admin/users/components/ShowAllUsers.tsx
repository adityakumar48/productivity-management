import { User } from "@prisma/client";
import { Badge, Table, Text } from "@radix-ui/themes";
import UsersAction from "./UsersAction";

interface Props {
  data: User[];
  loading?: boolean;
}

const ShowAllUsers = ({ data, loading }: Props) => {
  return (
    <div className="mt-4">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>S. no.</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>joined</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.map((item, index) => {
            // get the createdAt month and year
            const date = new Date(item.createdAt);
            const month = date.toLocaleString("default", { month: "long" });
            const year = date.getFullYear();

            // @ts-ignore

            return (
              <Table.Row key={item?.id}>
                <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>
                  {item.isAdmin === false ? (
                    <Text>User</Text>
                  ) : (
                    <Badge>Admin</Badge>
                  )}
                </Table.Cell>
                <Table.Cell>{`${month} ${year}`}</Table.Cell>

                <Table.Cell>
                  <UsersAction id={String(item.id)} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      {loading === true ? (
        <div className="flex flex-col w-full h-[50vh] justify-center items-center">
          <p className="text-gray-400 py-3 text-3xl font-semibold font-poppins">
            Loading...
          </p>
        </div>
      ) : (
        data?.length === 0 && (
          <div className="flex flex-col w-full h-[50vh] justify-center items-center">
            <p className="text-gray-400 py-3 text-3xl font-semibold font-poppins">
              No Users yet!
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default ShowAllUsers;
