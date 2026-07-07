type ProductDetailsAccordionProps = {
  description: string;
  shortDescription: string;
  stockQuantity: number;
  stockStatus?: string;
};

function ProductDetailsAccordion({
  description,
  shortDescription,
  stockQuantity,
  stockStatus,
}: ProductDetailsAccordionProps) {
  return (
    <div className="product-details-grid">
      <div className="glass-card product-detail-box">
        <div className="product-detail-icon">
          <i className="bi bi-card-text"></i>
        </div>

        <h4>Description</h4>
        <p>{description}</p>
      </div>

      <div className="glass-card product-detail-box">
        <div className="product-detail-icon">
          <i className="bi bi-info-circle"></i>
        </div>

        <h4>Product Details</h4>

        <p>
          <strong>Short Description:</strong> {shortDescription}
        </p>

        <p>
          <strong>Stock Quantity:</strong> {stockQuantity}
        </p>

        <p className="mb-0">
          <strong>Stock Status:</strong> {stockStatus || "Unknown"}
        </p>
      </div>

      <div className="glass-card product-detail-box">
        <div className="product-detail-icon">
          <i className="bi bi-truck"></i>
        </div>

        <h4>Shipping & Delivery</h4>
        <p>Orders are usually shipped within 2-5 business days.</p>
      </div>

      <div className="glass-card product-detail-box">
        <div className="product-detail-icon">
          <i className="bi bi-arrow-repeat"></i>
        </div>

        <h4>Returns & Refunds</h4>
        <p>Products can be returned within 14 days if unused.</p>
      </div>
    </div>
  );
}

export default ProductDetailsAccordion;
