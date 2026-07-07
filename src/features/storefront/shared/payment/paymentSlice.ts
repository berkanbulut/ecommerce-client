import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createStripeCheckoutSession } from "./paymentService";

import type {
  CreateStripeCheckoutSessionRequest,
  StripeCheckoutSessionResponse,
} from "./paymentTypes";

interface PaymentState {
  checkoutSession: StripeCheckoutSessionResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  checkoutSession: null,
  isLoading: false,
  error: null,
};

export const handleCreateStripeCheckoutSession = createAsyncThunk(
  "storefrontPayment/createStripeCheckoutSession",
  async (data: CreateStripeCheckoutSessionRequest, { rejectWithValue }) => {
    try {
      return await createStripeCheckoutSession(data);
    } catch {
      return rejectWithValue("Create Stripe checkout session failed");
    }
  },
);

const paymentSliceStoreFront = createSlice({
  name: "storefrontPayment",
  initialState,
  reducers: {
    clearCheckoutSession: (state) => {
      state.checkoutSession = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateStripeCheckoutSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(handleCreateStripeCheckoutSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checkoutSession = action.payload;
      })

      .addCase(handleCreateStripeCheckoutSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCheckoutSession } = paymentSliceStoreFront.actions;

export default paymentSliceStoreFront.reducer;
