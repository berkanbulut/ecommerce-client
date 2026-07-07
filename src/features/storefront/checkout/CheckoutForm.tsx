import type { CreateOrderRequest } from "../shared/order/orderTypes";

type CheckoutFormProps = {
  form: CreateOrderRequest;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
};

function CheckoutForm({ form, onChange }: CheckoutFormProps) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h4 className="fw-bold mb-4">Checkout Details</h4>

        <h6 className="fw-bold mb-3">Shipping Information</h6>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="shippingFullName"
              className="form-control"
              value={form.shippingFullName}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="shippingPhone"
              className="form-control"
              value={form.shippingPhone}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="shippingAddressLine"
              className="form-control"
              value={form.shippingAddressLine}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">City</label>
            <input
              type="text"
              name="shippingCity"
              className="form-control"
              value={form.shippingCity}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Country</label>
            <input
              type="text"
              name="shippingCountry"
              className="form-control"
              value={form.shippingCountry}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Postal Code</label>
            <input
              type="text"
              name="shippingPostalCode"
              className="form-control"
              value={form.shippingPostalCode}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <h6 className="fw-bold mb-3">Payment</h6>

        <div className="row g-3 mb-4">
          <div className="col-12">
            <label className="form-label">Payment Method</label>
            <select
              name="paymentMethod"
              className="form-select"
              value={form.paymentMethod}
              onChange={onChange}
            >
              <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
              <option value="CARD">Credit / Debit Card</option>
            </select>
          </div>
        </div>

        <h6 className="fw-bold mb-3">Note</h6>

        <textarea
          name="customerNote"
          className="form-control"
          rows={3}
          placeholder="Optional note for delivery"
          value={form.customerNote ?? ""}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default CheckoutForm;
