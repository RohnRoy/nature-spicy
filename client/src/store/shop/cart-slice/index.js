import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
};

// to mimic the cart data structure from the server
const mockCartData = (cartItems) => {
  return Promise.resolve({
    userId: null,
    items: cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      title: item.title,
      image: item.image,
      _id: crypto.randomUUID(),
    })),
  });
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity, price, title, image }) => {
    if (!userId) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const itemIndex = cartItems.findIndex(
        (item) => item.productId === productId
      );
      // if item already exists in cart, increase the quantity
      if (itemIndex > -1) {
        cartItems[itemIndex].quantity += quantity;
      } else {
        cartItems.push({ productId, quantity, price, title, image });
      }

      const cartData = await mockCartData(cartItems);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { data: cartData };
    } else {
      const response = await axios.post(
        "http://localhost:5000/api/shop/cart/add",
        {
          userId,
          productId,
          quantity,
        }
      );
      return response.data;
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    if (!userId) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const cartData = {
        success: true,
        data: await mockCartData(cartItems),
      };
      return cartData;
    } else {
      const response = await axios.get(
        `http://localhost:5000/api/shop/cart/get/${userId}`
      );
      return response.data;
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    if (!userId) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const updatedCartItems = cartItems.filter(
        (item) => item.productId !== productId
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      const cartData = await mockCartData(updatedCartItems);
      return { data: cartData };
    } else {
      const response = await axios.delete(
        `http://localhost:5000/api/shop/cart/${userId}/${productId}`
      );
      return response.data;
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    if (!userId) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const itemIndex = cartItems.findIndex(
        (item) => item.productId === productId
      );

      if (itemIndex > -1) {
        cartItems[itemIndex].quantity = quantity;
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      const cartData = await mockCartData(cartItems);
      return { data: cartData };
    } else {
      const response = await axios.put(
        "http://localhost:5000/api/shop/cart/update-cart",
        {
          userId,
          productId,
          quantity,
        }
      );
      return response.data;
    }
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
