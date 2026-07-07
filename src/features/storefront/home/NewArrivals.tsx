import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import type { AppDispatch, RootState } from "../../../app/api/store";
import ProductCard from "../product/ProductCard";
import { fetchNewArrivalsProducts } from "../shared/product/productSlice";

function NewArrivals() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("home");

  const { newArrivals, isLoading, error } = useSelector(
    (state: RootState) => state.productReducerStoreFront,
  );

  useEffect(() => {
    dispatch(fetchNewArrivalsProducts());
  }, [dispatch]);

  return (
    <section className="py-5">
      <div className="container">
        <div className="mb-4">
          <span className="text-uppercase text-muted fw-semibold">
            {t("newArrivals.eyebrow")}
          </span>

          <h2 className="fw-bold mt-2">{t("newArrivals.title")}</h2>
        </div>

        {isLoading && <p className="text-muted">{t("newArrivals.loading")}</p>}

        {error && <p className="text-danger">{error}</p>}

        {!isLoading && !error && newArrivals.length === 0 && (
          <p className="text-muted">{t("newArrivals.empty")}</p>
        )}

        {!isLoading && !error && newArrivals.length > 0 && (
          <div className="row g-4">
            {newArrivals.map((product) => (
              <div className="col-lg-3 col-md-6" key={product.id}>
                <ProductCard
                  id={product.id}
                  title={product.name}
                  slug={product.slug}
                  price={product.salePrice || product.price}
                  image={product.mainImageUrl}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default NewArrivals;
