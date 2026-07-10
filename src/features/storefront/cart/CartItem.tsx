import { useTranslation } from "react-i18next";

type CartItemProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  availableStock: number;
  currency: string;
  onUpdateQuantity: (cartItemId: number, quantity: number) => void;
  onRemove: (cartItemId: number) => void;
};

function CartItem({
  id,
  title,
  price,
  image,
  quantity,
  availableStock,
  currency,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const { t } = useTranslation("cart");

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < availableStock) {
      onUpdateQuantity(id, quantity + 1);
    }
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-2">
            <img src={image} alt={title} className="img-fluid rounded" />
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold mb-2">{title}</h5>

            <p className="text-muted mb-0">
              {price} {currency}
            </p>
          </div>

          <div className="col-md-3">
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-dark btn-sm"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                aria-label={t("item.decreaseQuantity")}
                title={t("item.decreaseQuantity")}
              >
                -
              </button>

              <input
                type="number"
                className="form-control text-center"
                min="1"
                max={availableStock}
                value={quantity}
                readOnly
              />

              <button
                type="button"
                className="btn btn-outline-dark btn-sm"
                onClick={handleIncrease}
                disabled={quantity >= availableStock}
                aria-label={t("item.increaseQuantity")}
                title={t("item.increaseQuantity")}
              >
                +
              </button>
            </div>
          </div>

          <div className="col-md-2">
            <h6 className="fw-bold mb-0">
              {price * quantity} {currency}
            </h6>
          </div>

          <div className="col-md-1 text-end">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => onRemove(id)}
              aria-label={t("item.remove")}
              title={t("item.remove")}
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
