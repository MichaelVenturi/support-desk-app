import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthState } from "../../../types/authState";

const initialState: IAuthState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
