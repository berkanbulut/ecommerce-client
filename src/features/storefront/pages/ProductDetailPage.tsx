import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import type { AppDispatch, RootState } from "../../../app/api/store";

import { fetchProductBySlug } from "../shared/product/productSlice";
import { handleAddItemToCart } from "../shared/cart/cartSlice";

import ProductDetailsAccordion from "../product/ProductDetailsAccordion";
import ProductGallery from "../product/ProductGallery";
import ProductInfo from "../product/ProductInfo";

function ProductDetailPage() {
  const { slug } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { t } = useTranslation(["product", "toast", "errors"]);

  const { accessToken } = useSelector((state: RootState) => state.auth);

  const { selectedProduct, isLoading, error } = useSelector(
    (state: RootState) => state.productReducerStoreFront,
  );

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductBySlug(slug));
    }
  }, [dispatch, slug]);

  const handleAddToCart = async (productId: number, quantity: number) => {
    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      await dispatch(handleAddItemToCart({ productId, quantity })).unwrap();

      toast.success(
        t("toast:productAdded", {
          product: selectedProduct?.name ?? "",
        }),
      );
    } catch {
      toast.error(t("errors:unexpected"));
    }
  };

  if (isLoading) {
    return (
      <section className="product-detail-section">
        <div className="container">
          <div className="glass-card p-5">
            <p className="text-muted mb-0">{t("product:detail.loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="product-detail-section">
        <div className="container">
          <div className="alert alert-danger">{error}</div>
        </div>
      </section>
    );
  }

  if (!selectedProduct) {
    return (
      <section className="product-detail-section">
        <div className="container">
          <div className="glass-card p-5">
            <h2 className="fw-bold mb-0">{t("product:detail.notFound")}</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-detail-section">
      <div className="container">
        <div className="mb-4">
          <Link to="/shop" className="product-back-link">
            <i className="bi bi-arrow-left"></i>
            {t("product:detail.backToShop")}
          </Link>
        </div>

        <div className="product-detail-shell">
          <ProductGallery
            mainImageUrl={selectedProduct.mainImageUrl}
            images={selectedProduct.images}
          />

          <ProductInfo
            productId={selectedProduct.id}
            title={selectedProduct.name}
            price={selectedProduct.price}
            description={selectedProduct.description}
            stockQuantity={selectedProduct.stockQuantity}
            stockStatus={selectedProduct.stockStatus}
            onAddToCart={handleAddToCart}
          />
        </div>

        <div className="mt-4">
          <ProductDetailsAccordion
            description={selectedProduct.description}
            shortDescription={selectedProduct.shortDescription}
            stockQuantity={selectedProduct.stockQuantity}
            stockStatus={selectedProduct.stockStatus}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
