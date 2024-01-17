import { Notes } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotesState {
  notes: Notes[];
}

const initialState: NotesState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // Add your reducers here
    setNotes: (state, action: PayloadAction<Notes[]>) => {
      state.notes = action.payload;
    },

    notes: (state) => state,

    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { setNotes, notes, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
