import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import ticketReducer from "./features/tickets/ticketSlice";
import noteReducer from "./features/notes/noteSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../types/stateTypes";
import { isAxiosError } from "axios";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
    note: noteReducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const errorHandler = (err: unknown) => {
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

export default store;
