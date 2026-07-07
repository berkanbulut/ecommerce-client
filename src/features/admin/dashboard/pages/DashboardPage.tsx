import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/api/store";
import { useEffect } from "react";
import { fetchProducts } from "../../products/productSlice";
import { handleGetCategories } from "../../categories/categorySlice";
import { handleGetUsers } from "../../users/userSlice";

function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { products } = useSelector((state: RootState) => state.product);

  const { categories } = useSelector((state: RootState) => state.category);

  const { users } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(handleGetCategories());
    dispatch(handleGetUsers());
  }, [dispatch]);

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalUsers = users.length;
  return (
    <div className="container-fluid">
      {/* Title */}
      <h2 className="mb-4 fw-bold">Dashboard</h2>

      {/* Stats Cards */}
      <div className="row g-4">
        {/* Products */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Products</h6>
              <h3 className="fw-bold">{totalProducts}</h3>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Categories</h6>
              <h3 className="fw-bold">{totalCategories}</h3>
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Users</h6>
              <h3 className="fw-bold">{totalUsers}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-5">
        <h4 className="mb-3">Recent Products</h4>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>iPhone 15</td>
                  <td>Electronics</td>
                  <td>$1200</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Nike Air Max</td>
                  <td>Shoes</td>
                  <td>$180</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>MacBook Pro</td>
                  <td>Electronics</td>
                  <td>$2500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
