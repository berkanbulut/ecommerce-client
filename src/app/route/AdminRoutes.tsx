import { Route } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import DashboardPage from "../../features/admin/dashboard/pages/DashboardPage";
import ProductsPage from "../../features/admin/products/pages/ProductsPage";
import CategoriesPage from "../../features/admin/categories/pages/CategoriesPage";
import BrandsPage from "../../features/admin/brands/pages/BrandsPage";
import AdminProtectedRoute from "./adminProtectedRoute";
import UsersPage from "../../features/admin/users/pages/UsersPage";
import PermissionsPage from "../../features/admin/permissions/pages/PermissionsPage";
import RolesPage from "../../features/admin/roles/pages/RolesPage";
import CreateProductPage from "../../features/admin/products/pages/CreateProductPage";
import EditProductPage from "../../features/admin/products/pages/EditProductPage";
import OrdersPage from "../../features/admin/orders/pages/OrdersPage";

const AdminRoutes = (
  <Route element={<AdminProtectedRoute />}>
    <Route path="/admin" element={<AdminLayout />}>
      {/* Dashboard */}
      <Route index element={<DashboardPage />} />

      {/* Products */}
      <Route path="products" element={<ProductsPage />} />
      <Route path="products/create" element={<CreateProductPage />} />
      <Route path="products/:id/edit" element={<EditProductPage />} />

      {/* Categories */}
      <Route path="categories" element={<CategoriesPage />} />

      {/* Brands */}
      <Route path="brands" element={<BrandsPage />} />

      {/* Permissions */}
      <Route path="permissions" element={<PermissionsPage />} />

      {/* Roles */}
      <Route path="roles" element={<RolesPage />} />

      {/* Users */}
      <Route path="users" element={<UsersPage />} />

      {/* Orders */}
      <Route path="orders" element={<OrdersPage />} />
    </Route>
  </Route>
);

export default AdminRoutes;
