import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  Brand,
  CreateBrandRequest,
  UpdateBrandRequest,
} from "./brandTypes";
import {
  createBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from "./brandService";

//STATE TYPE
interface BrandState {
  id: number | null;
  name: string | null;
  description: string | null;
  brands: Brand[];
  isLoading: boolean;
  error: string | null;
}

//INITIAL STATE
const initialState: BrandState = {
  id: null,
  name: null,
  description: null,
  brands: [],
  isLoading: false,
  error: null,
};

//ASYNC THUNK
export const handleGetBrands = createAsyncThunk(
  "admin/brands",
  async (_, { rejectWithValue }) => {
    try {
      return await getBrands();
    } catch {
      return rejectWithValue("Get brands failed");
    }
  },
);

export const handleCreateBrand = createAsyncThunk(
  "admin/createBrand",
  async (data: CreateBrandRequest, { rejectWithValue }) => {
    try {
      return await createBrand(data);
    } catch {
      return rejectWithValue("Create brand failed");
    }
  },
);

export const handleUpdateBrand = createAsyncThunk(
  "admin/updateBrand",
  async (data: UpdateBrandRequest, { rejectWithValue }) => {
    try {
      return await updateBrand(data);
    } catch {
      return rejectWithValue("Update brand failed");
    }
  },
);

export const handleDeleteBrand = createAsyncThunk(
  "admin/deleteBrand",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteBrand(id);
      return id;
    } catch {
      return rejectWithValue("Delete brand failed");
    }
  },
);

// SLICE
const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET BRANDS
      .addCase(handleGetBrands.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleGetBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleGetBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })

      // CREATE BRAND
      .addCase(handleCreateBrand.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleCreateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleCreateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands.push(action.payload);
      })

      // UPDATE BRAND
      .addCase(handleUpdateBrand.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleUpdateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleUpdateBrand.fulfilled, (state, action) => {
        state.isLoading = false;

        const updatedBrand = action.payload;
        const index = state.brands.findIndex(
          (brand) => brand.id === updatedBrand.id,
        );

        if (index !== -1) {
          state.brands[index] = updatedBrand;
        }
      })

      // DELETE BRAND
      .addCase(handleDeleteBrand.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleDeleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleDeleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = state.brands.filter(
          (brand) => brand.id !== action.payload,
        );
      });
  },
});

export default brandSlice.reducer;
