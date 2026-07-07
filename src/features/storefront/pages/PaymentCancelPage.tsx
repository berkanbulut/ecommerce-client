import { Link, useSearchParams } from "react-router-dom";

function PaymentCancelPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="card border-0 shadow-sm text-center">
          <div className="card-body py-5">
            <h1 className="fw-bold text-danger mb-3">Payment Cancelled</h1>

            <p className="text-muted mb-4">
              Your payment was cancelled. You can try again.
            </p>

            <div className="d-flex justify-content-center gap-2">
              {orderId && (
                <Link to={`/orders/${orderId}`} className="btn btn-dark">
                  View Order
                </Link>
              )}

              <Link to="/checkout" className="btn btn-outline-dark">
                Back to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentCancelPage;
