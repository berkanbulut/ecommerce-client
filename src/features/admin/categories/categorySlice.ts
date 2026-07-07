import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "./categoryTypes";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "./categoryService";

//STATE TYPE
interface CategoryState {
  id: number | null;
  name: string | null;
  description: string | null;
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

//INITIAL STATE
const initialState: CategoryState = {
  id: null,
  name: null,
  description: null,
  categories: [],
  isLoading: false,
  error: null,
};

//ASYNC THUNK
export const handleGetCategories = createAsyncThunk(
  "admin/categories",
  async (_, { rejectWithValue }) => {
    try {
      return await getCategories();
    } catch {
      return rejectWithValue("Get categories failed");
    }
  },
);

export const handleCreateCategory = createAsyncThunk(
  "admin/createCategory",
  async (data: CreateCategoryRequest, { rejectWithValue }) => {
    try {
      return await createCategory(data);
    } catch {
      return rejectWithValue("Create category failed");
    }
  },
);

export const handleUpdateCategory = createAsyncThunk(
  "admin/updateCategory",
  async (data: UpdateCategoryRequest, { rejectWithValue }) => {
    try {
      return await updateCategory(data);
    } catch {
      return rejectWithValue("Update category failed");
    }
  },
);

export const handleDeleteCategory = createAsyncThunk(
  "admin/deleteCategory",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteCategory(id);
      return id;
    } catch {
      return rejectWithValue("Delete category failed");
    }
  },
);

// SLICE
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET CATEGORIES
      .addCase(handleGetCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleGetCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleGetCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })

      // CREATE CATEGORY
      .addCase(handleCreateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleCreateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleCreateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.push(action.payload);
      })

      // UPDATE CATEGORY
      .addCase(handleUpdateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleUpdateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleUpdateCategory.fulfilled, (state, action) => {
        state.isLoading = false;

        const updatedCategory = action.payload;
        const index = state.categories.findIndex(
          (category) => category.id === updatedCategory.id,
        );

        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })

      // DELETE CATEGORY
      .addCase(handleDeleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleDeleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleDeleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload,
        );
      });
  },
});

export default categorySlice.reducer;
