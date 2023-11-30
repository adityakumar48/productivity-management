"use client";
import {
  Dialog,
  Button,
  Flex,
  TextField,
  Text,
  TextArea,
} from "@radix-ui/themes";
import React, { useState } from "react";
import DateTimePicker from "../components/DateTimePicker";
import { useSession } from "next-auth/react";
import axios from "axios";

const CreateReminder = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const { data: session, status } = useSession();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      console.log("hello");
      const res = await axios.post("/api/reminder", {
        title,
        description,
        time: startDate,
        email: session?.user.email,
        type: "Email",
        status: "Active",
      });
      console.log(res);
      setTitle("");
      setDescription("");
      setStartDate(new Date());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="px-4 py-2 rounded-md bg-purple-500 text-white ">
          Create Reminder
        </button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Create Reminder</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Create a new reminder...
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Enter your task..."
            />
          </label>
          <label>
            <Text size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextArea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="border "
              placeholder="Enter your task description..."
            />
          </label>
          <label>
            <Text size="2" mb="1" weight="bold">
              Date
            </Text>
            <div>
              <DateTimePicker
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </div>
          </label>
          <label>
            <Text size="2" mb="1" weight="bold">
              Email
            </Text>
            <div>
              <TextField.Input value={session?.user.email} disabled />
            </div>
          </label>
          <label>
            <Text size="2" mb="1" weight="bold">
              Status
            </Text>
            <div>
              <TextField.Input value="Active" disabled />
            </div>
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
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
              Create
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateReminder;
