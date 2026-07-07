import { useTranslation } from "react-i18next";

function TrustBadges() {
  const { t } = useTranslation("home");

  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="glass-card p-4 h-100">
              <h5 className="fw-bold mb-3">
                {t("trustBadges.freeShipping.title")}
              </h5>

              <p className="text-muted mb-0">
                {t("trustBadges.freeShipping.description")}
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card p-4 h-100">
              <h5 className="fw-bold mb-3">
                {t("trustBadges.securePayment.title")}
              </h5>

              <p className="text-muted mb-0">
                {t("trustBadges.securePayment.description")}
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card p-4 h-100">
              <h5 className="fw-bold mb-3">
                {t("trustBadges.easyReturns.title")}
              </h5>

              <p className="text-muted mb-0">
                {t("trustBadges.easyReturns.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustBadges;
