import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import ticketService from "./ticketService";
// types
import { IRootState, ITicket, ITicketState } from "../../../types/stateTypes";
import { ITicketPayload } from "../../../types/apiTypes";
import { isAxiosError } from "axios";

const initialState: ITicketState = {
  tickets: [],
  ticket: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

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

// get all tickets
export const getTickets = createAsyncThunk<ITicket[], void, { state: IRootState }>(
  "ticket/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token ?? "";
      return await ticketService.getTickets(token);
    } catch (err) {
      const message = errorHandler(err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get one ticket by id
export const getTicket = createAsyncThunk<ITicket, string, { state: IRootState }>(
  "ticket/get",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token ?? "";
      return await ticketService.getTicket(ticketId, token);
    } catch (err) {
      const message = errorHandler(err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// create new ticket
export const createTicket = createAsyncThunk<ITicket, ITicketPayload, { state: IRootState }>(
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

// close ticket
export const closeTicket = createAsyncThunk<ITicket, string, { state: IRootState }>(
  "ticket/close",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token ?? "";
      return await ticketService.closeTicket(ticketId, token);
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
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
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
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets.map((ticket) => (ticket._id === action.payload._id ? (ticket.status = "closed") : ticket));
      })
      .addMatcher(isAnyOf(createTicket.pending, getTickets.pending, getTicket.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(createTicket.rejected, getTickets.rejected, getTicket.rejected), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
