import { useState } from "react";
import { useTranslation } from "react-i18next";

type ProductInfoProps = {
  productId: number;
  title: string;
  price: number;
  salePrice: number;
  description: string;
  stockQuantity: number;
  stockStatus?: string;
  onAddToCart: (productId: number, quantity: number) => void;
};

function ProductInfo({
  productId,
  title,
  price,
  salePrice,
  description,
  stockQuantity,
  stockStatus,
  onAddToCart,
}: ProductInfoProps) {
  const { t } = useTranslation("product");

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
      <span className="product-eyebrow">{t("detail.premiumCollection")}</span>

      <h1 className="product-title">{title}</h1>

      <div className="product-rating-row">
        <div className="product-stars">
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-half"></i>
        </div>

        <span className="text-muted small">
          {t("detail.rating", {
            rating: "4.8",
            maxRating: "5.0",
          })}
        </span>
      </div>

      {price !== salePrice ? (
        <div className="product-price-wrapper">
          <span className="product-old-price">${price}</span>
          <h2 className="product-price">${salePrice}</h2>
        </div>
      ) : (
        <h2 className="product-price">${price}</h2>
      )}

      <p className="product-description">{description}</p>

      <div className="product-meta-grid">
        <div className="product-meta-card">
          <i className="bi bi-truck"></i>

          <div>
            <strong>{t("detail.fastDelivery")}</strong>
            <span>{t("detail.deliveryTime")}</span>
          </div>
        </div>

        <div className="product-meta-card">
          <i className="bi bi-shield-check"></i>

          <div>
            <strong>{t("detail.secureCheckout")}</strong>
            <span>{t("detail.stripeProtected")}</span>
          </div>
        </div>
      </div>

      <div className="product-stock-row">
        {isInStock ? (
          <span className="badge badge-delivered">
            {t("detail.inStock", { count: stockQuantity })}
          </span>
        ) : (
          <span className="badge badge-cancelled">
            {t("detail.outOfStock")}
          </span>
        )}
      </div>

      <div className="product-buy-row">
        <div className="quantity-control">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={!isInStock}
            aria-label="Decrease quantity"
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
            aria-label="Increase quantity"
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
          {t("detail.addToCart")}
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;
