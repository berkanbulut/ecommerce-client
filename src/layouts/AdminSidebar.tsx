import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/api/store";

function AdminSidebar() {
  const { authorities } = useSelector((state: RootState) => state.auth);

  const isAdmin = authorities.includes("ROLE_ADMIN");

  const isEditor =
    authorities.includes("category:create") &&
    authorities.includes("category:update") &&
    authorities.includes("ROLE_EDITOR");

  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      {isAdmin && <h4 className="mb-4">Admin Panel</h4>}
      {isEditor && <h4 className="mb-4">Editor Panel</h4>}

      <ul className="nav nav-pills flex-column">
        {/* ADMIN */}
        {isAdmin && (
          <>
            <li className="nav-item mb-2">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active bg-primary" : ""}`
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active bg-primary" : ""}`
                }
              >
                Products
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink
                to="/admin/brands"
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active bg-primary" : ""}`
                }
              >
                Brands
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink
                to="/admin/permissions"
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active bg-primary" : ""}`
                }
              >
                Permissions
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/admin/roles"
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active bg-primary" : ""}`
                }
              >
                Roles
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active bg-primary" : ""}`
                }
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active bg-primary" : ""}`
                }
              >
                Orders
              </NavLink>
            </li>
          </>
        )}
        {/* //EDITOR */}
        {(isAdmin || isEditor) && (
          <li className="nav-item mb-2">
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "active bg-primary" : ""}`
              }
            >
              Categories
            </NavLink>
          </li>
        )}

        <li className="nav-item mb-2">
          <NavLink to="/" className="nav-link text-white bg-danger">
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
