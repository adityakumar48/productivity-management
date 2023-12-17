"use client";
import { Reminder } from "@prisma/client";
import { Badge, Table } from "@radix-ui/themes";
import ReminderAction from "./ReminderAction";

interface Props {
  reminders: Reminder[];
  setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>;
}

const ShowAllReminder = ({ reminders, setReminders }: Props) => {
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
          {reminders?.map((reminder, index) => {
            // @ts-ignore
            const utcDate = new Date(reminder.Time);
            // convert utc to local date and time
            const localDate = new Date(
              utcDate.getTime() + utcDate.getTimezoneOffset()
            );

            return (
              <Table.Row key={reminder?.id}>
                <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
                <Table.Cell>{reminder.Title}</Table.Cell>
                <Table.Cell>{reminder.Type}</Table.Cell>
                <Table.Cell>{localDate.toLocaleTimeString()}</Table.Cell>
                <Table.Cell>
                  {reminder.Status === "completed" ? (
                    <Badge color="green">Completed</Badge>
                  ) : (
                    <Badge color="purple">Pending</Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <ReminderAction
                    id={String(reminder.id)}
                    setReminders={setReminders}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      {reminders?.length === 0 && (
        <div className="flex flex-col w-full h-[50vh] justify-center items-center">
          <p className="text-gray-400 py-3 text-3xl font-semibold font-poppins">
            No reminders yet!
          </p>
        </div>
      )}
    </div>
  );
};

export default ShowAllReminder;
