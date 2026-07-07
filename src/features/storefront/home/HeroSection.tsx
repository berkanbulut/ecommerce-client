import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HeroSection() {
  const navigate = useNavigate();
  const { t } = useTranslation("home");

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-shell">
          <div className="hero-content">
            <span className="hero-eyebrow">{t("hero.eyebrow")}</span>

            <h1 className="hero-title">
              {t("hero.titleStart")} <span>{t("hero.titleHighlight")}</span>
            </h1>

            <p className="hero-description">{t("hero.description")}</p>

            <div className="hero-actions">
              <button
                className="btn btn-dark btn-lg px-4"
                onClick={() => navigate("/shop")}
              >
                {t("hero.shopNow")}
              </button>

              <button
                className="btn btn-outline-dark btn-lg px-4"
                onClick={() => navigate("/orders")}
              >
                {t("hero.myOrders")}
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card">
              <img
                src="https://picsum.photos/700/600"
                alt="Hero"
                className="hero-image"
              />
            </div>

            <div className="hero-floating-card hero-floating-top">
              <i className="bi bi-shield-check"></i>

              <div>
                <strong>{t("hero.securePayment")}</strong>
                <span>{t("hero.stripeProtected")}</span>
              </div>
            </div>

            <div className="hero-floating-card hero-floating-bottom">
              <i className="bi bi-truck"></i>

              <div>
                <strong>{t("hero.fastDelivery")}</strong>
                <span>{t("hero.reliableShipping")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
