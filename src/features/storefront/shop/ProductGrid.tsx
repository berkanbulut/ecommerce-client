import ProductCard from "../product/ProductCard";
import type { Product } from "../../admin/products/productTypes";

type ProductGridProps = {
  products: Product[];
};

function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center text-muted py-5">No products found.</div>
    );
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div className="col-lg-4 col-md-6" key={product.id}>
          <ProductCard
            id={product.id}
            slug={product.slug}
            title={product.name}
            price={product.salePrice || product.price}
            image={product.mainImageUrl}
          />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
