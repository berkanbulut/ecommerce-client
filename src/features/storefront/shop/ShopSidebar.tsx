import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import type { AppDispatch, RootState } from "../../../app/api/store";
import { handleGetCategoriesShop } from "../shared/category/categoryStoreFrontSlice";
import { handleGetBrandsShop } from "../shared/brand/brandStoreFrontSlice";

type ShopSidebarProps = {
  selectedCategoryId: number | null;
  selectedBrandId: number | null;
  maxPrice: number;
  onCategorySelect: (categoryId: number | null) => void;
  onBrandSelect: (brandId: number | null) => void;
  onMaxPriceChange: (price: number) => void;
};

function ShopSidebar({
  selectedCategoryId,
  selectedBrandId,
  maxPrice,
  onCategorySelect,
  onBrandSelect,
  onMaxPriceChange,
}: ShopSidebarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("product");

  const { shopCategories } = useSelector(
    (state: RootState) => state.storefrontCategory,
  );

  const { shopBrand } = useSelector(
    (state: RootState) => state.storefrontBrand,
  );

  useEffect(() => {
    dispatch(handleGetCategoriesShop());
    dispatch(handleGetBrandsShop());
  }, [dispatch]);

  return (
    <aside className="shop-sidebar glass-card p-4">
      <div className="shop-filter-section">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="fw-bold mb-0">{t("shop.sidebar.categories")}</h5>

          <i className="bi bi-grid text-muted"></i>
        </div>

        <div className="shop-filter-option">
          <input
            className="form-check-input"
            type="radio"
            name="category"
            id="category-all"
            checked={selectedCategoryId === null}
            onChange={() => onCategorySelect(null)}
          />

          <label className="form-check-label" htmlFor="category-all">
            {t("shop.sidebar.allCategories")}
          </label>
        </div>

        {shopCategories.map((category) => (
          <div className="shop-filter-option" key={category.id}>
            <input
              className="form-check-input"
              type="radio"
              name="category"
              id={`category-${category.id}`}
              checked={selectedCategoryId === category.id}
              onChange={() => onCategorySelect(category.id)}
            />

            <label
              className="form-check-label"
              htmlFor={`category-${category.id}`}
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>

      <div className="shop-filter-divider" />

      <div className="shop-filter-section">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="fw-bold mb-0">{t("shop.sidebar.brands")}</h5>

          <i className="bi bi-tags text-muted"></i>
        </div>

        <div className="shop-filter-option">
          <input
            className="form-check-input"
            type="radio"
            name="brand"
            id="brand-all"
            checked={selectedBrandId === null}
            onChange={() => onBrandSelect(null)}
          />

          <label className="form-check-label" htmlFor="brand-all">
            {t("shop.sidebar.allBrands")}
          </label>
        </div>

        {shopBrand.map((brand) => (
          <div className="shop-filter-option" key={brand.id}>
            <input
              className="form-check-input"
              type="radio"
              name="brand"
              id={`brand-${brand.id}`}
              checked={selectedBrandId === brand.id}
              onChange={() => onBrandSelect(brand.id)}
            />

            <label className="form-check-label" htmlFor={`brand-${brand.id}`}>
              {brand.name}
            </label>
          </div>
        ))}
      </div>

      <div className="shop-filter-divider" />

      <div className="shop-filter-section">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="fw-bold mb-0">{t("shop.sidebar.priceRange")}</h5>

          <i className="bi bi-currency-dollar text-muted"></i>
        </div>

        <input
          type="range"
          className="form-range"
          min="0"
          max="5000"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
        />

        <div className="d-flex justify-content-between mt-2">
          <span className="text-muted">$0</span>
          <span className="fw-semibold">${maxPrice}</span>
        </div>
      </div>
    </aside>
  );
}

export default ShopSidebar;
