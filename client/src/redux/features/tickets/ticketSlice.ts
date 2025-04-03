import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { IRootState, ITicketState } from "../../../types/stateTypes";
import ticketService from "./ticketService";
import { isAxiosError } from "axios";

const initialState: ITicketState = {
  tickets: [],
  ticket: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

interface ITicketData {
  product: string;
  description: string;
}

const errorHandler = (err: unknown) => {
  let message = "unknown error";
  if (isAxiosError(err)) {
    message = err.response?.data?.message || err.message;
  } else if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === "string") {
    err.toString();
  }
  return message;
};

export const getTickets = createAsyncThunk<any, void, { state: IRootState }>("ticket/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token ?? "";
    return await ticketService.getTickets(token);
  } catch (err) {
    const message = errorHandler(err);
    return thunkAPI.rejectWithValue(message);
  }
});

export const createTicket = createAsyncThunk<any, ITicketData, { state: IRootState }>(
  "ticket/create",
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token ?? "";
      return await ticketService.createTicket(ticketData, token);
    } catch (err) {
      const message = errorHandler(err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addMatcher(isAnyOf(createTicket.pending, getTickets.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(createTicket.rejected, getTickets.rejected), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
