import { useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../app/api/store";
import { handleGetMyOrderById } from "../shared/order/orderSlice";

function OrderDetailPage() {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { accessToken } = useSelector((state: RootState) => state.auth);

  const { selectedOrder, isLoading, error } = useSelector(
    (state: RootState) => state.orderReducerStoreFront,
  );

  useEffect(() => {
    if (id) {
      dispatch(handleGetMyOrderById(Number(id)));
    }
  }, [dispatch, id]);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="container py-5">
        <p>Loading order...</p>
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
        <h3>Order not found.</h3>
      </div>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold">Order Details</h1>
            <p className="text-muted mb-0">
              Order No: {selectedOrder.orderNumber}
            </p>
          </div>

          <Link to="/orders" className="btn btn-outline-dark">
            Back to Orders
          </Link>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h4 className="fw-bold mb-4">Items</h4>

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
                        Quantity: {item.quantity}
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
                <h4 className="fw-bold mb-4">Shipping Address</h4>

                <p className="mb-2">
                  <strong>Name:</strong> {selectedOrder.shippingFullName}
                </p>

                <p className="mb-2">
                  <strong>Phone:</strong> {selectedOrder.shippingPhone}
                </p>

                <p className="mb-2">
                  <strong>Address:</strong> {selectedOrder.shippingAddressLine}
                </p>

                <p className="mb-2">
                  <strong>City:</strong> {selectedOrder.shippingCity}
                </p>

                <p className="mb-2">
                  <strong>Country:</strong> {selectedOrder.shippingCountry}
                </p>

                <p className="mb-0">
                  <strong>Postal Code:</strong>{" "}
                  {selectedOrder.shippingPostalCode}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h4 className="fw-bold mb-4">Order Summary</h4>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Order Status</span>
                  <span className="badge bg-primary">
                    {selectedOrder.orderStatus}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Payment Status</span>
                  <span className="badge bg-secondary">
                    {selectedOrder.paymentStatus}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Payment Method</span>
                  <span>{selectedOrder.paymentMethod}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Subtotal</span>
                  <span>
                    {selectedOrder.subtotal} {selectedOrder.currency}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Shipping</span>
                  <span>
                    {selectedOrder.shippingAmount} {selectedOrder.currency}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Tax</span>
                  <span>
                    {selectedOrder.taxAmount} {selectedOrder.currency}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Discount</span>
                  <span>
                    -{selectedOrder.discountAmount} {selectedOrder.currency}
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">Grand Total</h5>
                  <h5 className="fw-bold">
                    {selectedOrder.grandTotal} {selectedOrder.currency}
                  </h5>
                </div>
              </div>
            </div>

            {selectedOrder.customerNote && (
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h4 className="fw-bold mb-3">Customer Note</h4>
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
