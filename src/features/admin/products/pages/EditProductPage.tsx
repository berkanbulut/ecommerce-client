import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../../app/api/store";
import { handleGetProductById } from "../productSlice";
import CreateProductForm from "../components/CreateProductForm";

function EditProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedProduct, isLoading, error } = useSelector(
    (state: RootState) => state.product,
  );

  useEffect(() => {
    if (id) {
      dispatch(handleGetProductById(Number(id)));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <div className="p-3">Loading product...</div>;
  }

  if (error) {
    return <div className="p-3 text-danger">{error}</div>;
  }

  if (!selectedProduct) {
    return <div className="p-3">Product not found.</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Edit Product</h4>

        <Link to="/admin/products" className="btn btn-outline-secondary btn-sm">
          Back to Products
        </Link>
      </div>

      <div className="card-body">
        <CreateProductForm initialData={selectedProduct} />
      </div>
    </div>
  );
}

export default EditProductPage;
