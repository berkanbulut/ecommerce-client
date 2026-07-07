import { useState } from "react";

type ProductInfoProps = {
  productId: number;
  title: string;
  price: number;
  description: string;
  stockQuantity: number;
  stockStatus?: string;
  onAddToCart: (productId: number, quantity: number) => void;
};

function ProductInfo({
  productId,
  title,
  price,
  description,
  stockQuantity,
  stockStatus,
  onAddToCart,
}: ProductInfoProps) {
  const isInStock = stockQuantity > 0 && stockStatus !== "OUT_OF_STOCK";

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number) => {
    if (value < 1) {
      setQuantity(1);
      return;
    }

    if (value > stockQuantity) {
      setQuantity(stockQuantity);
      return;
    }

    setQuantity(value);
  };

  const decreaseQuantity = () => {
    handleQuantityChange(quantity - 1);
  };

  const increaseQuantity = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleAddToCart = () => {
    onAddToCart(productId, quantity);
  };

  return (
    <div className="product-info glass-card">
      <span className="product-eyebrow">Premium Collection</span>

      <h1 className="product-title">{title}</h1>

      <div className="product-rating-row">
        <div className="product-stars">
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-half"></i>
        </div>

        <span className="text-muted small">4.8 / 5.0</span>
      </div>

      <h2 className="product-price">${price}</h2>

      <p className="product-description">{description}</p>

      <div className="product-meta-grid">
        <div className="product-meta-card">
          <i className="bi bi-truck"></i>
          <div>
            <strong>Fast Delivery</strong>
            <span>2-5 business days</span>
          </div>
        </div>

        <div className="product-meta-card">
          <i className="bi bi-shield-check"></i>
          <div>
            <strong>Secure Checkout</strong>
            <span>Stripe protected</span>
          </div>
        </div>
      </div>

      <div className="product-stock-row">
        {isInStock ? (
          <span className="badge badge-delivered">
            In Stock ({stockQuantity})
          </span>
        ) : (
          <span className="badge badge-cancelled">Out of Stock</span>
        )}
      </div>

      <div className="product-buy-row">
        <div className="quantity-control">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={!isInStock}
          >
            -
          </button>

          <input
            type="number"
            min="1"
            max={stockQuantity}
            value={quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            disabled={!isInStock}
          />

          <button
            type="button"
            onClick={increaseQuantity}
            disabled={!isInStock}
          >
            +
          </button>
        </div>

        <button
          className="btn btn-dark btn-lg product-add-button"
          disabled={!isInStock}
          onClick={handleAddToCart}
        >
          <i className="bi bi-cart-plus me-2"></i>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;
