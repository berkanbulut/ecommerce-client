import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("checkout");

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h4 className="fw-bold mb-4">{t("form.title")}</h4>

        <h6 className="fw-bold mb-3">{t("form.shippingInformation")}</h6>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">{t("form.fullName")}</label>

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
            <label className="form-label">{t("form.phone")}</label>

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
            <label className="form-label">{t("form.address")}</label>

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
            <label className="form-label">{t("form.city")}</label>

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
            <label className="form-label">{t("form.country")}</label>

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
            <label className="form-label">{t("form.postalCode")}</label>

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

        <h6 className="fw-bold mb-3">{t("form.payment")}</h6>

        <div className="row g-3 mb-4">
          <div className="col-12">
            <label className="form-label">{t("form.paymentMethod")}</label>

            <select
              name="paymentMethod"
              className="form-select"
              value={form.paymentMethod}
              onChange={onChange}
            >
              <option value="CASH_ON_DELIVERY">
                {t("form.cashOnDelivery")}
              </option>

              <option value="CARD">{t("form.card")}</option>
            </select>
          </div>
        </div>

        <h6 className="fw-bold mb-3">{t("form.note")}</h6>

        <textarea
          name="customerNote"
          className="form-control"
          rows={3}
          placeholder={t("form.notePlaceholder")}
          value={form.customerNote ?? ""}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default CheckoutForm;
