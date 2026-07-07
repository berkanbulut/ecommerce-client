import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../api/store";

function AdminProtectedRoute() {
  const { accessToken, authorities } = useSelector(
    (state: RootState) => state.auth,
  );

  const isAuthenticated = !!accessToken;

  const isAdmin = authorities.includes("ROLE_ADMIN");

  const isEditor =
    authorities.includes("category:create") &&
    authorities.includes("category:update");

  const canAccessAdminPanel = isAdmin || isEditor;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!canAccessAdminPanel) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
