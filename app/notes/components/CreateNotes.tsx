"use client";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SimpleMDE from "react-simplemde-editor";

const CreateNotes = ({ getNotes }: { getNotes: () => void }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/notes", {
        title,
        content,
      });
      const data = await res.data;
      console.log(data);
      setTitle("");
      setContent("");
      // router.push("/notes");
      getNotes();
    } catch (err) {
      console.log(err);
    }
  };

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
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Enter your note..."
            />
          </label>
          <label>
            <Text size="2" mb="1" weight="bold">
              Content
            </Text>
            <SimpleMDE
              // onChange={(e) => setContent(e.target.value)}
              value={content}
              onChange={(e) => setContent(e)}
              className="border  "
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
              onClick={() => handleSubmit()}
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
