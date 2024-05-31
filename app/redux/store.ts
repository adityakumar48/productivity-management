import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./slices/notes";
import tasksSlice from "./slices/tasks";

export const store = configureStore({
  reducer: {
    notes: notesSlice,
    tasks: tasksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
