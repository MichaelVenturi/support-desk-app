import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import authService from "./authService";
// types
import { IAuthState, IUser } from "../../../types/stateTypes";
import { INewUserPayload, IUserPayload } from "../../../types/apiTypes";
import { errorHandler } from "../../store";

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

export const register = createAsyncThunk<IUser, INewUserPayload>("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (err) {
    const message = errorHandler(err);
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk<IUser, IUserPayload>("auth/login", async (user: IUserPayload, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (err) {
    const message = errorHandler(err);
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
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
      // async logout cases
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // register/logout cases
      .addMatcher(isAnyOf(register.pending, login.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(register.fulfilled, login.fulfilled), (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addMatcher(isAnyOf(register.rejected, login.rejected), (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
