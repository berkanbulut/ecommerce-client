import { useTranslation } from "react-i18next";

type ProductDetailsAccordionProps = {
  description: string;
  shortDescription: string;
  stockQuantity: number;
  stockStatus?: string;
};

function ProductDetailsAccordion({
  description,
  shortDescription,
  stockQuantity,
  stockStatus,
}: ProductDetailsAccordionProps) {
  const { t } = useTranslation("product");

  return (
    <div className="product-details-grid">
      <div className="glass-card product-detail-box">
        <div className="product-detail-icon">
          <i className="bi bi-card-text"></i>
        </div>

        <h4>{t("details.description.title")}</h4>
        <p>{description}</p>
      </div>

      <div className="glass-card product-detail-box">
        <div className="product-detail-icon">
          <i className="bi bi-info-circle"></i>
        </div>

        <h4>{t("details.productDetails.title")}</h4>

        <p>
          <strong>{t("details.productDetails.shortDescription")}:</strong>{" "}
          {shortDescription}
        </p>

        <p>
          <strong>{t("details.productDetails.stockQuantity")}:</strong>{" "}
          {stockQuantity}
        </p>

        {stockStatus === "IN_STOCK" ? (
          <p className="mb-0">
            <strong>{t("details.productDetails.stockStatus")}:</strong> In stock
            {/* {stockStatus || t("details.productDetails.unknown")} */}
          </p>
        ) : (
          <p className="mb-0">
            <strong>{t("details.productDetails.stockStatus")}:</strong> Out of
            stock
            {/* {stockStatus || t("details.productDetails.unknown")} */}
          </p>
        )}
      </div>

      <div className="glass-card product-detail-box">
        <div className="product-detail-icon">
          <i className="bi bi-truck"></i>
        </div>

        <h4>{t("details.shipping.title")}</h4>
        <p>{t("details.shipping.description")}</p>
      </div>

      <div className="glass-card product-detail-box">
        <div className="product-detail-icon">
          <i className="bi bi-arrow-repeat"></i>
        </div>

        <h4>{t("details.returns.title")}</h4>
        <p>{t("details.returns.description")}</p>
      </div>
    </div>
  );
}

export default ProductDetailsAccordion;
