import { Link, useSearchParams } from "react-router-dom";

function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="card border-0 shadow-sm text-center">
          <div className="card-body py-5">
            <h1 className="fw-bold text-success mb-3">Payment Successful</h1>

            <p className="text-muted mb-4">
              Your payment was completed successfully.
            </p>

            <div className="d-flex justify-content-center gap-2">
              {orderId && (
                <Link to={`/orders/${orderId}`} className="btn btn-dark">
                  View Order
                </Link>
              )}

              <Link to="/shop" className="btn btn-outline-dark">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentSuccessPage;
