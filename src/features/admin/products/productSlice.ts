import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "../../../app/api/store";

import type { ProductState, CreateProductRequest } from "./productTypes";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  uploadImage,
  deleteProduct,
} from "./productService";

/* INITIAL STATE */

const initialState: ProductState = {
  products: [],

  selectedProduct: null,

  uploadedMainImageUrl: null,

  uploadedGalleryUrls: [],

  isLoading: false,

  error: null,
};

/* GET PRODUCTS */

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",

  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch {
      return rejectWithValue("Failed to fetch products");
    }
  },
);

/* CREATE PRODUCT */

export const createNewProduct = createAsyncThunk(
  "products/createProduct",

  async (data: CreateProductRequest, { rejectWithValue }) => {
    try {
      return await createProduct(data);
    } catch {
      return rejectWithValue("Failed to create product");
    }
  },
);

/* UPLOAD SINGLE IMAGE */

export const uploadSingleImage = createAsyncThunk(
  "products/uploadSingleImage",

  async (file: File, { rejectWithValue }) => {
    try {
      return await uploadImage(file);
    } catch {
      return rejectWithValue("Failed to upload image");
    }
  },
);

/* UPDATE Product */
export const handleGetProductById = createAsyncThunk(
  "products/getProductById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await getProductById(id);
    } catch {
      return rejectWithValue("Failed to fetch product");
    }
  },
);

export const updateExistingProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    data: { id: number; product: CreateProductRequest },
    { rejectWithValue },
  ) => {
    try {
      return await updateProduct(data.id, data.product);
    } catch {
      return rejectWithValue("Failed to update product");
    }
  },
);

/* DELETE PRODUCT */

export const removeProduct = createAsyncThunk(
  "products/deleteProduct",

  async (id: number, { rejectWithValue }) => {
    try {
      await deleteProduct(id);

      return id;
    } catch {
      return rejectWithValue("Failed to delete product");
    }
  },
);

/* SLICE */

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    clearUploadedImages: (state) => {
      state.uploadedMainImageUrl = null;

      state.uploadedGalleryUrls = [];
    },
  },

  extraReducers: (builder) => {
    builder

      /* FETCH PRODUCTS */

      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;

        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload as string;
      })

      /* CREATE PRODUCT */

      .addCase(createNewProduct.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })

      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;

        state.products.unshift(action.payload);
      })

      .addCase(createNewProduct.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload as string;
      })

      /* UPLOAD IMAGE */

      .addCase(uploadSingleImage.fulfilled, (state, action) => {
        state.uploadedGalleryUrls.push(action.payload);
      })

      /* UPDATE PRODUCT */

      .addCase(handleGetProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(handleGetProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })

      .addCase(handleGetProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(updateExistingProduct.fulfilled, (state, action) => {
        state.isLoading = false;

        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product,
        );

        state.selectedProduct = action.payload;
      })

      /* DELETE PRODUCT */

      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload,
        );
      });
  },
});

export const { clearUploadedImages } = productSlice.actions;

export const selectProducts = (state: RootState) => state.product.products;

export default productSlice.reducer;
