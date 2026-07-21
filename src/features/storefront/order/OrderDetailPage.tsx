import { useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import type { AppDispatch, RootState } from "../../../app/api/store";
import { handleGetMyOrderById } from "../shared/order/orderSlice";

function OrderDetailPage() {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("orders");

  const { accessToken, isInitialized } = useSelector(
    (state: RootState) => state.auth,
  );

  const { selectedOrder, isLoading, error } = useSelector(
    (state: RootState) => state.orderReducerStoreFront,
  );

  useEffect(() => {
    if (id) {
      dispatch(handleGetMyOrderById(Number(id)));
    }
  }, [dispatch, id]);

  if (!isInitialized) {
    return null;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="container py-5">
        <p>{t("detail.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!selectedOrder) {
    return (
      <div className="container py-5">
        <h3>{t("detail.notFound")}</h3>
      </div>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold">{t("detail.title")}</h1>

            <p className="text-muted mb-0">
              {t("detail.orderNumber")}: {selectedOrder.orderNumber}
            </p>
          </div>

          <Link to="/orders" className="btn btn-outline-dark">
            {t("detail.backToOrders")}
          </Link>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h4 className="fw-bold mb-4">{t("detail.items")}</h4>

                {selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="row align-items-center border-bottom py-3"
                  >
                    <div className="col-md-2">
                      <img
                        src={item.productImageUrl}
                        alt={item.productName}
                        className="img-fluid rounded"
                      />
                    </div>

                    <div className="col-md-5">
                      <h6 className="fw-bold mb-1">{item.productName}</h6>

                      <p className="text-muted mb-0">
                        {t("detail.quantity")}: {item.quantity}
                      </p>
                    </div>

                    <div className="col-md-2">
                      {item.unitPrice} {selectedOrder.currency}
                    </div>

                    <div className="col-md-3 text-md-end fw-bold">
                      {item.totalPrice} {selectedOrder.currency}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h4 className="fw-bold mb-4">{t("detail.shippingAddress")}</h4>

                <p className="mb-2">
                  <strong>{t("detail.name")}:</strong>{" "}
                  {selectedOrder.shippingFullName}
                </p>

                <p className="mb-2">
                  <strong>{t("detail.phone")}:</strong>{" "}
                  {selectedOrder.shippingPhone}
                </p>

                <p className="mb-2">
                  <strong>{t("detail.address")}:</strong>{" "}
                  {selectedOrder.shippingAddressLine}
                </p>

                <p className="mb-2">
                  <strong>{t("detail.city")}:</strong>{" "}
                  {selectedOrder.shippingCity}
                </p>

                <p className="mb-2">
                  <strong>{t("detail.country")}:</strong>{" "}
                  {selectedOrder.shippingCountry}
                </p>

                <p className="mb-0">
                  <strong>{t("detail.postalCode")}:</strong>{" "}
                  {selectedOrder.shippingPostalCode}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h4 className="fw-bold mb-4">{t("detail.orderSummary")}</h4>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">{t("detail.orderStatus")}</span>

                  <span className="badge bg-primary">
                    {t(`status.${selectedOrder.orderStatus}`)}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">
                    {t("detail.paymentStatus")}
                  </span>

                  <span className="badge bg-secondary">
                    {t(`status.${selectedOrder.paymentStatus}`)}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">
                    {t("detail.paymentMethod")}
                  </span>

                  <span>
                    {t(`paymentMethod.${selectedOrder.paymentMethod}`)}
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">{t("detail.subtotal")}</span>

                  <span>
                    {selectedOrder.subtotal} {selectedOrder.currency}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">{t("detail.shipping")}</span>

                  <span>
                    {selectedOrder.shippingAmount} {selectedOrder.currency}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">{t("detail.tax")}</span>

                  <span>
                    {selectedOrder.taxAmount} {selectedOrder.currency}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">{t("detail.discount")}</span>

                  <span>
                    -{selectedOrder.discountAmount} {selectedOrder.currency}
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">{t("detail.grandTotal")}</h5>

                  <h5 className="fw-bold">
                    {selectedOrder.grandTotal} {selectedOrder.currency}
                  </h5>
                </div>
              </div>
            </div>

            {selectedOrder.customerNote && (
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h4 className="fw-bold mb-3">{t("detail.customerNote")}</h4>

                  <p className="text-muted mb-0">
                    {selectedOrder.customerNote}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderDetailPage;
