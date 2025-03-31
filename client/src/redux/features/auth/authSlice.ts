import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthState } from "../../../types/stateTypes";
import authService from "./authService";
import { isAxiosError } from "axios";
import { INewUserPayload, IUserPayload } from "../../../types/apiTypes";

// get user from localstorage
const localUser = localStorage.getItem("user");
const user = localUser ? JSON.parse(localUser) : null;

const initialState: IAuthState = {
  user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk("auth/register", async (user: INewUserPayload, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (err) {
    let message = "unknown error";
    if (isAxiosError(err)) {
      message = err.response?.data?.message || err.message;
    } else if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === "string") {
      err.toString();
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk("auth/login", async (user: IUserPayload, thunkAPI) => {
  console.log(user);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  // these change state due to actions outside of this slice, like from another slice or asyncthunk actions (here)
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
