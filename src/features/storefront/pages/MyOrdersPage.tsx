import { useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import type { AppDispatch, RootState } from "../../../app/api/store";
import { handleGetMyOrders } from "../shared/order/orderSlice";

function MyOrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation("orders");

  const { accessToken } = useSelector((state: RootState) => state.auth);

  const { orders, isLoading, error } = useSelector(
    (state: RootState) => state.orderReducerStoreFront,
  );

  useEffect(() => {
    if (accessToken) {
      dispatch(handleGetMyOrders());
    }
  }, [dispatch, accessToken]);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <section className="py-5">
        <div className="container">
          <p className="text-muted">{t("list.loading")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="mb-5">
          <h1 className="fw-bold">{t("list.title")}</h1>
          <p className="text-muted">{t("list.subtitle")}</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {orders.length === 0 ? (
          <div className="glass-card p-5 text-center">
            <h4 className="fw-bold">{t("list.emptyTitle")}</h4>
            <p className="text-muted mb-0">{t("list.emptyDescription")}</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="glass-card order-card p-4 d-flex align-items-center justify-content-between gap-4"
              >
                <div>
                  <div className="text-muted small mb-1">
                    {t("list.orderNumber")}
                  </div>
                  <h6 className="fw-bold mb-0">{order.orderNumber}</h6>
                </div>

                <div>
                  <div className="text-muted small mb-1">{t("list.total")}</div>
                  <strong>
                    {order.grandTotal} {order.currency}
                  </strong>
                </div>

                <div>
                  <div className="text-muted small mb-1">
                    {t("list.orderStatus")}
                  </div>

                  <span
                    className={`badge ${
                      order.orderStatus === "CONFIRMED"
                        ? "badge-processing"
                        : "badge-pending"
                    }`}
                  >
                    {t(`status.${order.orderStatus}`)}
                  </span>
                </div>

                <div>
                  <div className="text-muted small mb-1">
                    {t("list.payment")}
                  </div>

                  <span
                    className={`badge ${
                      order.paymentStatus === "PAID"
                        ? "badge-paid"
                        : "badge-pending"
                    }`}
                  >
                    {t(`status.${order.paymentStatus}`)}
                  </span>
                </div>

                <div>
                  <div className="text-muted small mb-1">{t("list.date")}</div>

                  <span>
                    {new Date(order.createdAt).toLocaleDateString(
                      i18n.language === "no" ? "nb-NO" : "en-US",
                    )}
                  </span>
                </div>

                <Link
                  to={`/orders/${order.id}`}
                  className="btn btn-sm btn-outline-dark"
                >
                  {t("list.viewDetails")}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyOrdersPage;
