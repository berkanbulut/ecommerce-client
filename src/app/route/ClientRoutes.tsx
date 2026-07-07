import { Route } from "react-router-dom";

import HomePage from "../../features/storefront/pages/HomePage";
import LoginPage from "../../features/auth/pages/LoginPage";
import StoreFrontLayout from "../../layouts/StoreFrontLayout";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import ShopPage from "../../features/storefront/pages/ShopPage";
import CartPage from "../../features/storefront/pages/CartPage";
import ProductDetailPage from "../../features/storefront/pages/ProductDetailPage";
import CheckoutPage from "../../features/storefront/pages/CheckOutPage";
import MyOrdersPage from "../../features/storefront/pages/MyOrdersPage";
import OrderDetailPage from "../../features/storefront/order/OrderDetailPage";
import PaymentSuccessPage from "../../features/storefront/pages/PaymentSuccessPage";
import PaymentCancelPage from "../../features/storefront/pages/PaymentCancelPage";

const ClientRoutes = (
  <Route path="" element={<StoreFrontLayout />}>
    <Route path="shop" element={<ShopPage />} />
    <Route path="cart" element={<CartPage />} />
    <Route index element={<HomePage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route path="products/:slug" element={<ProductDetailPage />} />
    <Route path="checkout" element={<CheckoutPage />} />
    <Route path="orders" element={<MyOrdersPage />} />
    <Route path="/orders/:id" element={<OrderDetailPage />} />
    <Route path="payment/success" element={<PaymentSuccessPage />} />
    <Route path="payment/cancel" element={<PaymentCancelPage />} />
  </Route>
);

export default ClientRoutes;
