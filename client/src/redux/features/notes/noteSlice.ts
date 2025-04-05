import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import noteService from "./noteService";
import { INote, INoteState, IRootState } from "../../../types/stateTypes";
import { INewNotePayload } from "../../../types/apiTypes";
import { errorHandler } from "../../store";

const initialState: INoteState = {
  notes: [],
  ticketId: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// get all notes for ticket
export const getNotes = createAsyncThunk<{ data: INote[]; ticketId: string }, string, { state: IRootState }>(
  "note/getAll",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token ?? "";
      return await noteService.getNotes(ticketId, token);
    } catch (err) {
      const message = errorHandler(err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// create a note
export const createNote = createAsyncThunk<INote, INewNotePayload, { state: IRootState }>(
  "note/create",
  async ({ noteText, ticketId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token ?? "";

      return await noteService.createNote(noteText, ticketId, token);
    } catch (err) {
      const message = errorHandler(err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setTicketId: (state, action) => {
      state.ticketId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload.data;
        state.ticketId = action.payload.ticketId;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addMatcher(isAnyOf(getNotes.pending, createNote.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getNotes.rejected, createNote.rejected), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.ticketId = "";
      });
  },
});

export const { reset, setTicketId } = noteSlice.actions;
export default noteSlice.reducer;
