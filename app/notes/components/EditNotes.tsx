"use client";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Notes } from "@prisma/client";
import { useRouter } from "next/navigation";
import { BsPencilSquare } from "react-icons/bs";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"));

interface Props {
  note?: Notes;
  id: string;
  getNotes?: () => Promise<void>;
}

const EditNotes = ({ note, id }: Props) => {
  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");
  const router = useRouter();

  useEffect(() => {
    setTitle(note?.Title);
    setContent(note?.Content);
  }, [note]);

  const handleSubmit = async () => {
    try {
      const res = await axios.put(`/api/notes/${id}`, {
        title,
        content,
      });
      const data = await res.data;
      console.log(data);
      setTitle("");
      setContent("");
      router.push("/notes");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="solid">
          <BsPencilSquare /> <Text>Edit</Text>
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 600 }}>
        <Dialog.Title>Edit Note</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Edit a Note here ...
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text size="2" mb="1" weight="bold">
              Title
            </Text>

            <TextField.Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              defaultValue={note?.Title}
            />
          </label>
          <label>
            <Text size="2" mb="1" weight="bold">
              Content
            </Text>
            <SimpleMDE
              value={content}
              defaultValue={note?.Content}
              onChange={(e) => setContent(e)}
              className="border  "
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
              Update
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditNotes;
