import { Task, TaskStatus } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  tasks: [] as Task[],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchTasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    changeStatus: (
      state,
      action: PayloadAction<{ id: number; status: TaskStatus; time: string }>
    ) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            Status: action.payload.status,
            Time: action.payload.time,
          };
        }
        return task;
      });
    },
  },
});

export const {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  deleteTask,
  createTask,
  changeStatus,
} = tasksSlice.actions;
export default tasksSlice.reducer;
