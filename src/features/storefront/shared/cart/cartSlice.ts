import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "./cartService";
import type {
  AddCartItemRequest,
  Cart,
  UpdateCartItemRequest,
} from "./cartTypes";

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  isLoading: false,
  error: null,
};

export const handleGetCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      return await cartService.getCart();
    } catch {
      return rejectWithValue("Get cart failed");
    }
  },
);

export const handleAddItemToCart = createAsyncThunk(
  "cart/addItem",
  async (payload: AddCartItemRequest, { rejectWithValue }) => {
    try {
      return await cartService.addItem(payload);
    } catch {
      return rejectWithValue("Add item to cart failed");
    }
  },
);

export const handleUpdateCartItem = createAsyncThunk(
  "cart/updateItem",
  async (
    {
      cartItemId,
      payload,
    }: {
      cartItemId: number;
      payload: UpdateCartItemRequest;
    },
    { rejectWithValue },
  ) => {
    try {
      return await cartService.updateItem(cartItemId, payload);
    } catch {
      return rejectWithValue("Update cart item failed");
    }
  },
);

export const handleRemoveCartItem = createAsyncThunk(
  "cart/removeItem",
  async (cartItemId: number, { rejectWithValue }) => {
    try {
      return await cartService.removeItem(cartItemId);
    } catch {
      return rejectWithValue("Remove cart item failed");
    }
  },
);

export const handleClearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      return await cartService.clearCart();
    } catch {
      return rejectWithValue("Clear cart failed");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartLocal: (state) => {
      state.cart = null;
      state.isLoading = false;
      state.error = null;
    },
    resetCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET CART
      .addCase(handleGetCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleGetCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleGetCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })

      // ADD ITEM
      .addCase(handleAddItemToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleAddItemToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleAddItemToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })

      // UPDATE ITEM
      .addCase(handleUpdateCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleUpdateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleUpdateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })

      // REMOVE ITEM
      .addCase(handleRemoveCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleRemoveCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleRemoveCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })

      // CLEAR CART
      .addCase(handleClearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleClearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleClearCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      });
  },
});

export const { clearCartLocal, resetCartError } = cartSlice.actions;

export default cartSlice.reducer;
