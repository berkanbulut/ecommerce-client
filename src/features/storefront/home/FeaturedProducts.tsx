import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import type { AppDispatch, RootState } from "../../../app/api/store";

import ProductCard from "../product/ProductCard";
import { fetchFeaturedProducts } from "../shared/product/productSlice";

function FeaturedProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("home");

  const { featuredProducts, isLoading, error } = useSelector(
    (state: RootState) => state.productReducerStoreFront,
  );

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="mb-4">
          <h3 className="text-uppercase text-muted fw-semibold">
            {t("featured.eyebrow")}
          </h3>
        </div>

        {isLoading && <p className="text-muted">{t("featured.loading")}</p>}

        {error && <p className="text-danger">{error}</p>}

        {!isLoading && !error && featuredProducts.length === 0 && (
          <p className="text-muted">{t("featured.empty")}</p>
        )}

        {!isLoading && !error && featuredProducts.length > 0 && (
          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div className="col-lg-4 col-md-6" key={product.id}>
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

export default FeaturedProducts;
