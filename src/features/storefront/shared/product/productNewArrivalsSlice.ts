// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getNewArrivalsProducts } from "./productStoreFrontService";
// import type { ProductState } from "./productStoreFrontTypes";

// const initialState: ProductState = {
//   products: [],

//   selectedProduct: null,

//   uploadedMainImageUrl: null,

//   uploadedGalleryUrls: [],

//   isLoading: false,

//   error: null,
// };

// export const fetchNewArrivalsProducts = createAsyncThunk(
//   "products/newArrivals",

//   async (_, { rejectWithValue }) => {
//     try {
//       return await getNewArrivalsProducts();
//     } catch {
//       return rejectWithValue("Failed to fetch products");
//     }
//   },
// );

// const productSliceNewArrrivals = createSlice({
//   name: "products",

//   initialState,

//   reducers: {
//     clearUploadedImages: (state) => {
//       state.uploadedMainImageUrl = null;

//       state.uploadedGalleryUrls = [];
//     },
//   },

//   extraReducers: (builder) => {
//     builder

//       /* FETCH FEATURED PRODUCTS */

//       .addCase(fetchNewArrivalsProducts.pending, (state) => {
//         state.isLoading = true;

//         state.error = null;
//       })

//       .addCase(fetchNewArrivalsProducts.fulfilled, (state, action) => {
//         state.isLoading = false;

//         state.products = action.payload;
//       })

//       .addCase(fetchNewArrivalsProducts.rejected, (state, action) => {
//         state.isLoading = false;

//         state.error = action.payload as string;
//       });
//   },
// });

// export default productSliceNewArrrivals.reducer;
