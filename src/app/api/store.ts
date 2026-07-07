import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import userReducer from "../../features/admin/users/userSlice";
import permissionReducer from "../../features/admin/permissions/permissionSlice";
import roleReducer from "../../features/admin/roles/roleSlice";
import categoryReducer from "../../features/admin/categories/categorySlice";
import brandReducer from "../../features/admin/brands/brandSlice";
import productReducer from "../../features/admin/products/productSlice";
import categoryReducerStoreFront from "../../features/storefront/shared/category/categoryStoreFrontSlice";
import brandReducerStoreFront from "../../features/storefront/shared/brand/brandStoreFrontSlice";
import productReducerStoreFront from "../../features/storefront/shared/product/productSlice";
// import productReducerNewArrivals from "../../features/storefront/shared/product/productNewArrivalsSlice";
import cartSliceReducer from "../../features/storefront/shared//cart/cartSlice";
import orderSliceReducer from "../../features/admin/orders/orderSlice";
import orderReducerStoreFront from "../../features/storefront/shared/order/orderSlice";
import paymentReducerStoreFront from "../../features/storefront/shared/payment/paymentSlice";
import themeReducer from "../../features/theme/themeSlice";
import languageReducer from "../../features/language/languageSlice";
export const store = configureStore({
  reducer: {
    //ADMIN
    auth: authReducer,
    user: userReducer,
    permission: permissionReducer,
    role: roleReducer,
    category: categoryReducer,
    brand: brandReducer,
    product: productReducer,
    order: orderSliceReducer,

    //StoreFront
    // store.ts
    storefrontCategory: categoryReducerStoreFront,
    storefrontBrand: brandReducerStoreFront,
    productReducerStoreFront: productReducerStoreFront,
    // productReducerNewArrivals: productReducerNewArrivals,
    cartSliceReducer: cartSliceReducer,
    orderReducerStoreFront: orderReducerStoreFront,
    paymentReducerStoreFront: paymentReducerStoreFront,
    //theme
    theme: themeReducer,
    //language
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
