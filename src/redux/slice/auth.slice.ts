/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api";
import { AuthState } from "../../interfaces/user";

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        "/user/auth/login",
        credentials
      );
      console.log("response", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    dispatch(clearAuth());
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("anyware-token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.result;
        localStorage.setItem("anyware-token", action.payload.token);
        localStorage.setItem(
          "anyware-user",
          JSON.stringify(action.payload.result)
        );
      })
      .addCase(login.rejected, (state, action) => {
        console.log("action", action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        localStorage.removeItem("anyware-token");
      });
  },
});

export const { setToken, setUser, clearAuth } = authSlice.actions;

export default authSlice.reducer;
