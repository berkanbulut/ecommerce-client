import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import type { AppDispatch, RootState } from "../../../app/api/store";
import { handleGetCategoriesStoreFront } from "../shared/category/categoryStoreFrontSlice";
import { STOREFRONT_CONFIG } from "../../../config/storefront-config";

const categoryIcons = [
  "bi bi-grid-3x3-gap",
  "bi bi-laptop",
  "bi bi-phone",
  "bi bi-controller",
];

function CategoryShowcase() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("home");

  const { categories, isLoading } = useSelector(
    (state: RootState) => state.storefrontCategory,
  );

  useEffect(() => {
    dispatch(handleGetCategoriesStoreFront());
  }, [dispatch]);

  return (
    <section className="py-5">
      <div className="container">
        <div className="mb-4">
          <span className="text-uppercase text-muted fw-semibold">
            {t("categories.eyebrow")}
          </span>

          <h2 className="fw-bold mt-2 mb-0">{t("categories.title")}</h2>
        </div>

        {isLoading ? (
          <p className="text-muted">{t("categories.loading")}</p>
        ) : (
          <div className="row g-4">
            {categories
              .slice(0, STOREFRONT_CONFIG.homepage.categoriesCount)
              .map((category, index) => (
                <div className="col-6 col-md-3" key={category.id}>
                  <div className="card glass-card h-100 text-center py-4">
                    <div className="card-body">
                      <div className="category-icon-circle mx-auto mb-3">
                        <i
                          className={`${
                            categoryIcons[index] || "bi bi-box"
                          } fs-1`}
                        ></i>
                      </div>

                      <h5 className="card-title fw-bold mb-3">
                        {category.name}
                      </h5>

                      <Link
                        to={`/shop?categoryId=${category.id}`}
                        className="btn btn-outline-dark btn-sm"
                      >
                        {t("categories.shopNow")}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CategoryShowcase;
