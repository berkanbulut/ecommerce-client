import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <div className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
