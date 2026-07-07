import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import type { AppDispatch } from "../../../../app/api/store";
import { removeProduct } from "../productSlice";
import type { Product } from "../productTypes";

type ProductTableProps = {
  products: Product[];
};

function ProductTable({ products }: ProductTableProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteProduct = (product: Product) => {
    toast(
      ({ closeToast }) => (
        <div>
          <div className="mb-2">
            Are you sure you want to delete <strong>{product.name}</strong>?
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-danger"
              onClick={async () => {
                const resultAction = await dispatch(removeProduct(product.id));

                if (removeProduct.fulfilled.match(resultAction)) {
                  toast.success(`${product.name} has been deleted`);
                }

                if (removeProduct.rejected.match(resultAction)) {
                  toast.error(`Failed to delete ${product.name}`);
                }

                closeToast?.();
              }}
            >
              Delete
            </button>

            <button
              className="btn btn-sm btn-secondary"
              onClick={() => closeToast?.()}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
      },
    );
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Products</h4>

        <Link to="/admin/products/create" className="btn btn-primary btn-sm">
          Create Product
        </Link>
      </div>

      <div className="card-body p-0">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>

                <td>{product.slug}</td>

                <td>
                  {product.price} {product.currency}
                </td>

                <td>{product.stockQuantity}</td>

                <td>{product.categoryId}</td>

                <td>{product.brandId}</td>

                <td>
                  <span
                    className={`badge ${
                      product.active ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {product.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>{product.featured ? "Yes" : "No"}</td>

                <td>
                  <Link
                    to={`/admin/products/${product.id}/edit`}
                    className="btn btn-outline-primary btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeleteProduct(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-5 text-muted">No products found.</div>
        )}
      </div>
    </div>
  );
}

export default ProductTable;
