import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import type { AppDispatch, RootState } from "../../../app/api/store";

import CheckoutForm from "../checkout/CheckoutForm";
import CheckoutSummary from "../checkout/CheckoutSummary";

import { handleGetCart } from "../shared/cart/cartSlice";
import { handleCreateOrder } from "../shared/order/orderSlice";
import type { CreateOrderRequest } from "../shared/order/orderTypes";

import { handleCreateStripeCheckoutSession } from "../shared/payment/paymentSlice";

function CheckoutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation("checkout");

  const { accessToken, username, isInitialized } = useSelector(
    (state: RootState) => state.auth,
  );

  const { cart, isLoading: cartLoading } = useSelector(
    (state: RootState) => state.cartSliceReducer,
  );

  const { isLoading: orderLoading } = useSelector(
    (state: RootState) => state.orderReducerStoreFront,
  );

  const { isLoading: paymentLoading } = useSelector(
    (state: RootState) => state.paymentReducerStoreFront,
  );

  const [form, setForm] = useState<CreateOrderRequest>({
    paymentMethod: "CASH_ON_DELIVERY",
    shippingFullName: username ?? "",
    shippingPhone: "",
    shippingAddressLine: "",
    shippingCity: "",
    shippingCountry: "",
    shippingPostalCode: "",
    customerNote: "",
  });

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    if (!cart || cart.items.length === 0) {
      toast.error(t("errors.emptyCart"));
      return;
    }

    const orderResult = await dispatch(handleCreateOrder(form));

    if (!handleCreateOrder.fulfilled.match(orderResult)) {
      toast.error(t("errors.createOrderFailed"));
      return;
    }

    const createdOrder = orderResult.payload;

    if (form.paymentMethod === "CARD") {
      const paymentResult = await dispatch(
        handleCreateStripeCheckoutSession({
          orderId: createdOrder.id,
        }),
      );

      if (handleCreateStripeCheckoutSession.fulfilled.match(paymentResult)) {
        window.location.href = paymentResult.payload.url;
        return;
      }

      toast.error(t("errors.stripeSessionFailed"));
      return;
    }

    toast.success(t("success.orderCreated"));
    navigate("/orders");
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="mb-5">
          <h1 className="fw-bold">{t("page.title")}</h1>

          <p className="text-muted">{t("page.subtitle")}</p>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <CheckoutForm form={form} onChange={handleChange} />
          </div>

          <div className="col-lg-4">
            <CheckoutSummary
              cart={cart}
              isLoading={cartLoading || orderLoading || paymentLoading}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
