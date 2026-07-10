import { useTranslation } from "react-i18next";

import type { ProductSort } from "../shared/product/productStoreFrontTypes";

type SortBarProps = {
  searchTerm: string;
  sortBy: ProductSort;
  onSearchChange: (value: string) => void;
  onSortChange: (value: ProductSort) => void;
};

function SortBar({
  searchTerm,
  sortBy,
  onSearchChange,
  onSortChange,
}: SortBarProps) {
  const { t } = useTranslation("product");

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
      <h4 className="fw-bold mb-0">{t("shop.title")}</h4>

      <div className="d-flex flex-column flex-sm-row gap-2">
        <input
          type="text"
          className="form-control shop-search-input"
          placeholder={t("shop.search.placeholder")}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <select
          className="form-select shop-sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as ProductSort)}
        >
          <option value="newest">{t("shop.sort.newest")}</option>
          <option value="price_asc">{t("shop.sort.priceLowToHigh")}</option>
          <option value="price_desc">{t("shop.sort.priceHighToLow")}</option>
          <option value="name_asc">{t("shop.sort.nameAscending")}</option>
          <option value="name_desc">{t("shop.sort.nameDescending")}</option>
        </select>
      </div>
    </div>
  );
}

export default SortBar;
