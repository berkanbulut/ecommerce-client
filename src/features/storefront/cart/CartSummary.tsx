import { Link } from "react-router-dom";

type CartSummaryProps = {
  subtotal: number;
  currency: string | null;
  totalItems: number;
  onClearCart: () => void;
};

function CartSummary({
  subtotal,
  currency,
  totalItems,
  onClearCart,
}: CartSummaryProps) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h4 className="fw-bold mb-4">Order Summary</h4>

        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted">Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="d-flex justify-content-between mb-4">
          <span className="text-muted">Subtotal</span>
          <span>
            {subtotal} {currency ?? ""}
          </span>
        </div>

        <Link
          to={totalItems === 0 ? "#" : "/checkout"}
          className={`btn btn-dark w-100 mb-2 ${
            totalItems === 0 ? "disabled" : ""
          }`}
        >
          Proceed to Checkout
        </Link>

        <button
          className="btn btn-outline-danger w-100"
          onClick={onClearCart}
          disabled={totalItems === 0}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
