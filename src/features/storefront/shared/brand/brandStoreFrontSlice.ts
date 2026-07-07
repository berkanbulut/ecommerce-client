import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBrandsStoreFront } from "./brandStoreFrontService";
import type { Brand } from "./brandStoreFrontTypes";

interface BrandState {
  id: number | null;
  name: string | null;
  description: string | null;
  brands: Brand[];
  shopBrand: Brand[];
  isLoading: boolean;
  error: string | null;
}

//INITIAL STATE
const initialState: BrandState = {
  id: null,
  name: null,
  description: null,
  brands: [],
  shopBrand: [],
  isLoading: false,
  error: null,
};

export const handleGetBrandsStoreFront = createAsyncThunk(
  "storeFront/getBrands",
  async (_, { rejectWithValue }) => {
    try {
      return await getBrandsStoreFront();
    } catch {
      return rejectWithValue("Get brands failed");
    }
  },
);

export const handleGetBrandsShop = createAsyncThunk(
  "storeFront/shopBrand",
  async (_, { rejectWithValue }) => {
    try {
      return await getBrandsStoreFront();
    } catch {
      return rejectWithValue("Get brands failed");
    }
  },
);

const brandSliceStoreFront = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET BRANDS
      .addCase(handleGetBrandsStoreFront.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleGetBrandsStoreFront.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleGetBrandsStoreFront.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })

      // GET BRANDS FOR SHOP
      .addCase(handleGetBrandsShop.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleGetBrandsShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleGetBrandsShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopBrand = action.payload;
      });
  },
});

export default brandSliceStoreFront.reducer;
