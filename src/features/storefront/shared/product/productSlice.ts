/* INITIAL STATE */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  ProductFilterParams,
  ProductState,
} from "./productStoreFrontTypes";
import {
  getFeauturedProducts,
  getNewArrivalsProducts,
  getProductById,
  getProductBySlug,
  getProductsByBrand,
  getProductsByCategory,
  getShopProducts,
} from "./productStoreFrontService";

const initialState: ProductState = {
  featuredProducts: [],

  newArrivals: [],

  shopProducts: [],

  selectedProduct: null,

  uploadedMainImageUrl: null,

  uploadedGalleryUrls: [],

  isLoading: false,

  error: null,
};

/* GET PRODUCTS */

export const fetchFeaturedProducts = createAsyncThunk(
  "storefrontProduct/fetchFeaturedProducts",

  async (_, { rejectWithValue }) => {
    try {
      return await getFeauturedProducts();
    } catch {
      return await rejectWithValue("Failed to fetch products");
    }
  },
);

export const fetchShopProducts = createAsyncThunk(
  "storefrontProduct/fetchShopProducts",
  async (filters: ProductFilterParams | undefined, { rejectWithValue }) => {
    try {
      return await getShopProducts(filters);
    } catch {
      return rejectWithValue("Failed to fetch shop products");
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "storefrontProduct/fetchProductById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await getProductById(id);
    } catch {
      return rejectWithValue("Failed to fetch product");
    }
  },
);

export const fetchNewArrivalsProducts = createAsyncThunk(
  "products/newArrivals",

  async (_, { rejectWithValue }) => {
    try {
      return await getNewArrivalsProducts();
    } catch {
      return rejectWithValue("Failed to fetch products");
    }
  },
);

export const fetchProductsByCategory = createAsyncThunk(
  "storefrontProduct/fetchProductsByCategory",
  async (categoryId: number, { rejectWithValue }) => {
    try {
      return await getProductsByCategory(categoryId);
    } catch {
      return rejectWithValue("Failed to fetch products by category");
    }
  },
);

export const fetchProductsByBrand = createAsyncThunk(
  "storefrontProduct/fetchProductsByBrand",

  async (brandId: number, { rejectWithValue }) => {
    try {
      return await getProductsByBrand(brandId);
    } catch {
      return rejectWithValue("Failed to fetch products by brand");
    }
  },
);

export const fetchProductBySlug = createAsyncThunk(
  "storefrontProduct/fetchProductBySlug",

  async (slug: string, { rejectWithValue }) => {
    try {
      return await getProductBySlug(slug);
    } catch {
      return rejectWithValue("Failed to fetch product");
    }
  },
);
/* SLICE */

const productFeatured = createSlice({
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

      /* FETCH FEATURED PRODUCTS */

      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })

      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.isLoading = false;

        state.featuredProducts = action.payload;
      })

      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload as string;
      })

      /* FETCH SHOP PRODUCTS */
      .addCase(fetchShopProducts.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })

      .addCase(fetchShopProducts.fulfilled, (state, action) => {
        state.isLoading = false;

        state.shopProducts = action.payload;
      })

      .addCase(fetchShopProducts.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload as string;
      })

      /* FETCH SHOP PRODUCTS */

      .addCase(fetchNewArrivalsProducts.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })

      .addCase(fetchNewArrivalsProducts.fulfilled, (state, action) => {
        state.isLoading = false;

        state.newArrivals = action.payload;
      })

      .addCase(fetchNewArrivalsProducts.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload as string;
      })

      /* FETCH PRODUCTS BY ID */
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })

      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* FETCH PRODUCTS BY SLUG */
      .addCase(fetchProductBySlug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })

      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* FETCH PRODUCTS BY CATEGORY ID */

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopProducts = action.payload;
      })

      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* FETCH PRODUCTS BY BRAND ID */
      .addCase(fetchProductsByBrand.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchProductsByBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopProducts = action.payload;
      })

      .addCase(fetchProductsByBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default productFeatured.reducer;
