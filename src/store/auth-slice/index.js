import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};
// User Registration logic
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

// User Login logic
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    formData,
    { withCredentials: true }
  );
  return response.data;
});
// Auth Middleware
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(
    "http://localhost:5000/api/auth/check-auth",
    {
      withCredentials: true,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate,proxt-revalidate",
        Expires: "0",
      },
    }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // You can handle setting user data here if needed
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true; // Fixed incorrect state assignment
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true; // Set to true after successful registration
        state.user = action.payload; // Store user data from the response
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null; // Optionally handle error message here
        // Optionally, you can access `action.payload` if there was an error message
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true; // Fixed incorrect state assignment
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.isAuthenticated = action.payload.success; // Set to true after successful login
        state.user = action.payload.success ? action.payload.user : null; // Store user data from the response
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null; // Optionally handle error message here
        // Optionally, you can access `action.payload` if there was an error message
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true; // Fixed incorrect state assignment
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success; // Set to true after successful login
        state.user = action.payload.success ? action.payload.user : null; // Store user data from the response
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null; // Optionally handle error message here
        // Optionally, you can access `action.payload` if there was an error message
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
