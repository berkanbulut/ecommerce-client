import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getOrderById, getOrders, updateOrder } from "./orderService";

import type { OrderState, UpdateOrderRequest } from "./orderTypes";

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
};

/* GET ORDERS */

export const handleGetOrders = createAsyncThunk(
  "order/getOrders",

  async (_, { rejectWithValue }) => {
    try {
      return await getOrders();
    } catch {
      return rejectWithValue("Failed to get orders");
    }
  },
);

/* GET ORDER BY ID */

export const handleGetOrderById = createAsyncThunk(
  "order/getOrderById",

  async (id: number, { rejectWithValue }) => {
    try {
      return await getOrderById(id);
    } catch {
      return rejectWithValue("Failed to get order");
    }
  },
);

/* UPDATE ORDER */

export const handleUpdateOrder = createAsyncThunk(
  "order/updateOrder",

  async (
    {
      id,
      payload,
    }: {
      id: number;
      payload: UpdateOrderRequest;
    },
    { rejectWithValue },
  ) => {
    try {
      return await updateOrder(id, payload);
    } catch {
      return rejectWithValue("Failed to update order");
    }
  },
);

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* GET ORDERS */

      .addCase(handleGetOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(handleGetOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })

      .addCase(handleGetOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* GET ORDER BY ID */

      .addCase(handleGetOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(handleGetOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedOrder = action.payload;
      })

      .addCase(handleGetOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* UPDATE ORDER */

      .addCase(handleUpdateOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(handleUpdateOrder.fulfilled, (state, action) => {
        state.isLoading = false;

        state.selectedOrder = action.payload;

        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order,
        );
      })

      .addCase(handleUpdateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
