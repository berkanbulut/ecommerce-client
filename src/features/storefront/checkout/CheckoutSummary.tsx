import { useTranslation } from "react-i18next";

import type { Cart } from "../shared/cart/cartTypes";

type CheckoutSummaryProps = {
  cart: Cart | null;
  isLoading: boolean;
  onPlaceOrder: () => Promise<void>;
};

function CheckoutSummary({
  cart,
  isLoading,
  onPlaceOrder,
}: CheckoutSummaryProps) {
  const { t } = useTranslation("checkout");

  const subtotal = cart?.subtotal ?? 0;
  const shipping = 0;
  const total = subtotal + shipping;
  const currency = cart?.currency ?? "";
  const isCartEmpty = !cart || cart.items.length === 0;

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h4 className="fw-bold mb-4">{t("summary.title")}</h4>

        {isCartEmpty ? (
          <p className="text-muted">{t("summary.emptyCart")}</p>
        ) : (
          <>
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between mb-3"
              >
                <span className="text-muted">
                  {item.productName} × {item.quantity}
                </span>

                <span>
                  {item.totalPrice} {item.currency}
                </span>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">{t("summary.subtotal")}</span>

              <span>
                {subtotal} {currency}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">{t("summary.shipping")}</span>

              <span>
                {shipping} {currency}
              </span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <h5 className="fw-bold">{t("summary.total")}</h5>

              <h5 className="fw-bold">
                {total} {currency}
              </h5>
            </div>
          </>
        )}

        <button
          type="button"
          className="btn btn-dark w-100 btn-lg"
          onClick={onPlaceOrder}
          disabled={isLoading || isCartEmpty}
        >
          {isLoading ? t("summary.placingOrder") : t("summary.placeOrder")}
        </button>
      </div>
    </div>
  );
}

export default CheckoutSummary;
