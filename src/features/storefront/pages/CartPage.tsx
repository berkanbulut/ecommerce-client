import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import type { AppDispatch, RootState } from "../../../app/api/store";

import CartItem from "../cart/CartItem";
import CartSummary from "../cart/CartSummary";

import {
  handleClearCart,
  handleGetCart,
  handleRemoveCartItem,
  handleUpdateCartItem,
} from "../shared/cart/cartSlice";

function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("cart");

  const { accessToken, isInitialized } = useSelector(
    (state: RootState) => state.auth,
  );

  const { cart, isLoading, error } = useSelector(
    (state: RootState) => state.cartSliceReducer,
  );

  useEffect(() => {
    if (accessToken) {
      dispatch(handleGetCart());
    }
  }, [dispatch, accessToken]);

  if (!isInitialized) {
    return null;
  }
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  const handleUpdateQuantity = (cartItemId: number, quantity: number) => {
    dispatch(
      handleUpdateCartItem({
        cartItemId,
        payload: { quantity },
      }),
    );
  };

  const handleRemoveItem = (cartItemId: number) => {
    dispatch(handleRemoveCartItem(cartItemId));
  };

  const handleClear = () => {
    dispatch(handleClearCart());
  };

  if (isLoading && !cart) {
    return (
      <section className="py-5 bg-light">
        <div className="container">
          <p>{t("page.loading")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="mb-5">
          <h1 className="fw-bold">{t("page.title")}</h1>
          <p className="text-muted">{t("page.subtitle")}</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {!cart || cart.items.length === 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <h4 className="fw-bold">{t("page.emptyTitle")}</h4>

              <p className="text-muted mb-4">{t("page.emptyDescription")}</p>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              {cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.productName}
                  price={item.unitPrice}
                  image={item.productImageUrl}
                  quantity={item.quantity}
                  availableStock={item.availableStock}
                  currency={item.currency}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            <div className="col-lg-4">
              <CartSummary
                subtotal={cart.subtotal}
                currency={cart.currency}
                totalItems={cart.totalItems}
                onClearCart={handleClear}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;
