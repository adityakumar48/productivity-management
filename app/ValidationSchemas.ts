import { z } from "zod";

export const taskSchema = z.object({
  Task: z.string().min(1, "Task is required.").max(100),
  Status: z.string(),
  email: z.string(),
});
