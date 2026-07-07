import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createOrder, getMyOrderById, getMyOrders } from "./orderService";

import type { CreateOrderRequest, OrderState } from "./orderTypes";

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
};

export const handleCreateOrder = createAsyncThunk(
  "storefrontOrder/createOrder",
  async (data: CreateOrderRequest, { rejectWithValue }) => {
    try {
      return await createOrder(data);
    } catch {
      return rejectWithValue("Create order failed");
    }
  },
);

export const handleGetMyOrders = createAsyncThunk(
  "storefrontOrder/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyOrders();
    } catch {
      return rejectWithValue("Get orders failed");
    }
  },
);

export const handleGetMyOrderById = createAsyncThunk(
  "storefrontOrder/getMyOrderById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await getMyOrderById(id);
    } catch {
      return rejectWithValue("Get order failed");
    }
  },
);

const orderSliceStoreFront = createSlice({
  name: "storefrontOrder",

  initialState,

  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(handleCreateOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(handleCreateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedOrder = action.payload;
        state.orders = [action.payload, ...state.orders];
      })

      .addCase(handleCreateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(handleGetMyOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(handleGetMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })

      .addCase(handleGetMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(handleGetMyOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(handleGetMyOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedOrder = action.payload;
      })

      .addCase(handleGetMyOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedOrder } = orderSliceStoreFront.actions;

export default orderSliceStoreFront.reducer;
