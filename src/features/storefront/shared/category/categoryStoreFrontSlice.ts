import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Category } from "./categoryStoreFrontTypes";
import {
  getCategoriesShop,
  getCategoriesStoreFront,
} from "./categoryStoreFrontService";

//STATE TYPE
interface CategoryState {
  id: number | null;
  name: string | null;
  description: string | null;
  categories: Category[];
  shopCategories: Category[];
  isLoading: boolean;
  error: string | null;
}

//INITIAL STATE
const initialState: CategoryState = {
  id: null,
  name: null,
  description: null,
  categories: [],
  shopCategories: [],
  isLoading: false,
  error: null,
};

//ASYNC THUNK
export const handleGetCategoriesStoreFront = createAsyncThunk(
  "categories/storeFront",
  async (_, { rejectWithValue }) => {
    try {
      return await getCategoriesStoreFront();
    } catch {
      return rejectWithValue("Get categories failed");
    }
  },
);

export const handleGetCategoriesShop = createAsyncThunk(
  "categories/Shop",
  async (_, { rejectWithValue }) => {
    try {
      return await getCategoriesShop();
    } catch {
      return rejectWithValue("Get categories failed");
    }
  },
);

const categorySliceStoreFront = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET CATEGORIES
      .addCase(handleGetCategoriesStoreFront.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleGetCategoriesStoreFront.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleGetCategoriesStoreFront.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })

      // GET CATEGORIES SHOP
      .addCase(handleGetCategoriesShop.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleGetCategoriesShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleGetCategoriesShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopCategories = action.payload;
      });
  },
});

export default categorySliceStoreFront.reducer;
