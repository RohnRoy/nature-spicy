import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token : null
};

export const registerUser = createAsyncThunk(
  "/auth/register",

  async (formData) => {
    const response = await axios.post(
      `${process.env.VITE_API_URL}/api/auth/register`,
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",

  async (formData) => {
    // check if there are any items in the cart and add them to the form data for saving to user's cart
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      formData.cartItems = cartItems;
    }
    const response = await axios.post(
      `${process.env.VITE_API_URL}/api/auth/login`,
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      `${process.env.VITE_API_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

// export const checkAuth = createAsyncThunk(
//   "/auth/checkauth",

//   async () => {
//     const response = await axios.get(
//       `${process.env.VITE_API_URL}/api/auth/check-auth`,
//       {
//         withCredentials: true,
//         headers: {
//           "Cache-Control":
//             "no-store, no-cache, must-revalidate, proxy-revalidate",
//         },
//       }
//     );

//     return response.data;
//   }
// );

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async (token) => {
    const response = await axios.get(
      `${process.env.VITE_API_URL}/api/auth/check-auth`,
      {
        
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    resetTokenandCrendentials: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // console.log(action);
        localStorage.removeItem("cartItems");
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.token = action.payload.token;
        sessionStorage.setItem('token', JSON.stringify(action.payload.token));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, resetTokenandCrendentials } = authSlice.actions;
export default authSlice.reducer;
