import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message"
import axiosInstance from "../api/axios"
const token = localStorage.getItem("token");
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await axiosInstance.post("/auth/login", {email, password});
      localStorage.setItem('token', data.data.token);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
   localStorage.removeItem('token');
});
const initialState = token
  ? { isLoggedIn: true, token }
  : { isLoggedIn: false, token: null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});
const { reducer } = authSlice;
export default reducer;