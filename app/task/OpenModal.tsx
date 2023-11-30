import { Task, TaskStatus } from "@prisma/client";
import {
  AlertDialog,
  Button,
  Checkbox,
  Flex,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { CgMoveTask } from "react-icons/cg";
import DateTimePicker from "../components/DateTimePicker";
import axios from "axios";

interface timers {
  id: number;
  elapsedTime: string;
  Status: TaskStatus;
  Task: string;
  Time: string;
  loading: boolean;
  createdAt: string;
  fetchTask: () => void;
  description: string;
  priority: string;
}
interface Props {
  click: boolean;
  item: timers;
  setData?: React.Dispatch<React.SetStateAction<Task[]>>;
}

const OpenModal = ({ click, item, setData }: Props) => {
  const { data: session, status } = useSession();
  const [checked, setChecked] = React.useState(false);
  const [task, setTask] = React.useState(item.Task);
  const [description, setDescription] = React.useState(item.Task);
  const [priority, setPriority] = React.useState("none");
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the state whenever the user types on the input field
    setTask(e.target.value);

    setData?.((prev) =>
      prev.map((item) => {
        if (item.id === item.id) {
          return { ...item, Task: e.target.value };
        }
        return item;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const res = await axios.patch(`/api/tasks/update/${item.id}`, {
        Task: task,
        description: description,
        priority: priority,
      });

      setData?.((prev) =>
        prev.map((item) => {
          if (item.id === item.id) {
            return {
              ...item,
              Task: task,
              description: description,
              priority: priority,
            };
          }
          return item;
        })
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <AiFillEye
          className={`${
            click ? " cursor-not-allowed" : ""
          }text-lg  cursor-pointer`}
        />
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Edit Task</AlertDialog.Title>
        <AlertDialog.Description size={"1"}>
          <Text className="text-[14px] pb-2 text-neutral-500">
            Make changes to your Task here. Click save when you&apos;re done.
          </Text>
        </AlertDialog.Description>
        <AlertDialog.Description size="1" ml={"2"}>
          <Flex gap="4" py={"4"} align={"center"}>
            <Text
              size={"3"}
              className="font-bold text-neutral-500 tracking-widest "
            >
              {" "}
              Task :-
            </Text>
            <TextField.Root>
              <TextField.Input
                defaultValue={item.Task}
                onChange={handleChange}
                name="Task"
                value={task}
              />
            </TextField.Root>
          </Flex>
          <Text className="flex items-center gap-1 pb-3 pt-2">
            <CgMoveTask className="text-lg " />{" "}
            <Text className="text-md">Task Description (Optional) : -</Text>
          </Text>
          <TextArea
            variant="classic"
            className="border border-purple-400 w-[80%] "
            placeholder="Enter Task Description here..."
            defaultValue={item.description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Flex
            gap={"3"}
            justify={"between"}
            height={"100%"}
            py={"4"}
            align={"center"}
          >
            <Flex gap={"2"} align={"center"}>
              <Text
                size={"3"}
                className="font-semibold text-neutral-500 tracking-wider"
              >
                {" "}
                Time :-
              </Text>
              <TextField.Root>
                <TextField.Input
                  disabled
                  value={
                    item.Status === "TASK"
                      ? "00:00:00"
                      : item.elapsedTime || item.Time
                  }
                />
              </TextField.Root>
            </Flex>
            <Flex gap={"2"} align={"center"}>
              <Text
                size={"3"}
                className="font-semibold text-neutral-500 tracking-wider"
              >
                {" "}
                Status :-
              </Text>
              <TextField.Root>
                <TextField.Input disabled value={item.Status} />
              </TextField.Root>
            </Flex>
          </Flex>

          <Flex gap={"2"} align={"center"}>
            <Text
              size={"3"}
              className="font-semibold text-neutral-500 tracking-wider"
            >
              {" "}
              Priority :-
            </Text>
            <Select.Root
              defaultValue={item.priority}
              onValueChange={(value) => setPriority(value)}
            >
              <Select.Trigger className="w-32" />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="High">High</Select.Item>
                  <Select.Item value="Medium">Medium</Select.Item>
                  <Select.Item value="Low">Low</Select.Item>
                  <Select.Item value="none">None</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex gap={"1"} my={"4"} align={"center"}>
            <Checkbox
              checked={checked}
              // @ts-ignore
              onCheckedChange={setChecked}
            />
            <Text className="text-sm">Remind me</Text>
            {checked && (
              <>
                <TextField.Root className="w-60 gap-2">
                  <TextField.Input
                    className="w-full"
                    defaultValue={session?.user.email}
                    disabled
                  />
                </TextField.Root>

                <DateTimePicker
                  startDate={startDate}
                  setStartDate={setStartDate}
                />
              </>
            )}
          </Flex>

          {/* Created Time */}
          <Flex gap={"2"} pb={"2"} justify={"end"} align={"center"}>
            <Text
              size={"1"}
              className="font-bold text-neutral-500 tracking-wider"
            >
              {" "}
              Created :-
            </Text>
            <Text size={"1"}>
              {item.createdAt.split("T")[0] +
                " " +
                item.createdAt.split("T")[1].split(".")[0]}
            </Text>
          </Flex>
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="between">
          <Text className="text-[10px] text-neutral-500 pt-2">
            Note: You can&apos;t edit time and status of a task.
          </Text>
          <Flex gap={"3"}>
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                type="submit"
                className="bg-purple-400"
                // click to submit the form and close the dialog
                onClick={() => {
                  // @ts-ignore
                  handleSubmit();
                }}
              >
                Save Changes
              </Button>
            </AlertDialog.Action>
          </Flex>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default OpenModal;
