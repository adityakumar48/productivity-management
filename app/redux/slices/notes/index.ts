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

    // create a new reducer to get notes by id and add it to the notesSlice
    getNotesById: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id === action.payload);
      console.log("Final: ", state.notes);
      return state;
    },

    notesById: (state) => state,
  },
});

export const { setNotes, notes, deleteNote, getNotesById, notesById } =
  notesSlice.actions;
export default notesSlice.reducer;
