"use client";
import {
  Dialog,
  Button,
  Flex,
  TextField,
  TextArea,
  Text,
} from "@radix-ui/themes";
import { title } from "process";
import React, { useState } from "react";

const CreateNotes = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          variant="solid"
          color="purple"
          size={"2"}
          className="px-4 py-2 rounded-md cursor-pointer bg-purple-500 text-white "
        >
          Create Note
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Create Note</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Create a new Note...
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Enter your note..."
            />
          </label>
          <label>
            <Text size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextArea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              rows={5}
              className="border "
              placeholder="Enter your note description..."
            />
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
              color="purple"
              className="bg-purple-400"
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

export default CreateNotes;
