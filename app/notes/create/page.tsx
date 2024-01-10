"use client";
import { Dialog, Flex, TextField, Button, Text } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"));
import "easymde/dist/easymde.min.css";

interface IssueForm {
  title: string;
  content: string;
}

const NotesCreatePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/notes", data);
      })}
    >
      <Dialog.Root>
        <Dialog.Trigger></Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 600 }}>
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
                {...register("title")}
                placeholder="Enter your note..."
              />
            </label>
            <label>
              <Text size="2" mb="1" weight="bold">
                Content
              </Text>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <SimpleMDE
                    placeholder="Enter your note description..."
                    {...field}
                  />
                )}
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
              >
                Create
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </form>
  );
};

export default NotesCreatePage;
