import { useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../app/api/store";
import { handleGetMyOrders } from "../shared/order/orderSlice";

function MyOrdersPage() {
  const dispatch = useDispatch<AppDispatch>();

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
          <p className="text-muted">Loading orders...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="mb-5">
          <h1 className="fw-bold">My Orders</h1>
          <p className="text-muted">View all orders you have placed.</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {orders.length === 0 ? (
          <div className="glass-card p-5 text-center">
            <h4 className="fw-bold">No orders found</h4>
            <p className="text-muted mb-0">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="glass-card order-card p-4 d-flex align-items-center justify-content-between gap-4"
              >
                <div>
                  <div className="text-muted small mb-1">Order No</div>
                  <h6 className="fw-bold mb-0">{order.orderNumber}</h6>
                </div>

                <div>
                  <div className="text-muted small mb-1">Total</div>
                  <strong>
                    {order.grandTotal} {order.currency}
                  </strong>
                </div>

                <div>
                  <div className="text-muted small mb-1">Order Status</div>
                  <span
                    className={`badge ${
                      order.orderStatus === "CONFIRMED"
                        ? "badge-processing"
                        : "badge-pending"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <div>
                  <div className="text-muted small mb-1">Payment</div>
                  <span
                    className={`badge ${
                      order.paymentStatus === "PAID"
                        ? "badge-paid"
                        : "badge-pending"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>

                <div>
                  <div className="text-muted small mb-1">Date</div>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>

                <Link
                  to={`/orders/${order.id}`}
                  className="btn btn-sm btn-outline-dark"
                >
                  View Details
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
