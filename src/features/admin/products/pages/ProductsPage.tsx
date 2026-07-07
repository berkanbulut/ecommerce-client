import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../../app/api/store";
import { fetchProducts } from "../productSlice";
import ProductTable from "../components/ProductTable";

function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { products, isLoading, error } = useSelector(
    (state: RootState) => state.product,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return <ProductTable products={products} />;
}

export default ProductsPage;
