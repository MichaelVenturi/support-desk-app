import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import ticketReducer from "./features/tickets/ticketSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../types/stateTypes";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
