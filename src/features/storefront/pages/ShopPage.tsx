import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../app/api/store";
import { fetchShopProducts } from "../shared/product/productSlice";
import type { ProductSort } from "../shared/product/productStoreFrontTypes";

import ProductGrid from "../shop/ProductGrid";
import ShopSidebar from "../shop/ShopSidebar";
import SortBar from "../shop/SortBar";

const PRODUCTS_PER_LOAD = 12;

function ShopPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  const { shopProducts, isLoading, error } = useSelector(
    (state: RootState) => state.productReducerStoreFront,
  );

  const categoryIdFromUrl = searchParams.get("categoryId");

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    categoryIdFromUrl ? Number(categoryIdFromUrl) : null,
  );

  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState(5000);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<ProductSort>("newest");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_LOAD);

  useEffect(() => {
    if (categoryIdFromUrl) {
      setSelectedCategoryId(Number(categoryIdFromUrl));
    } else {
      setSelectedCategoryId(null);
    }

    setVisibleCount(PRODUCTS_PER_LOAD);
  }, [categoryIdFromUrl]);

  useEffect(() => {
    dispatch(
      fetchShopProducts({
        search: searchTerm,
        categoryId: selectedCategoryId,
        brandId: selectedBrandId,
        minPrice: 0,
        maxPrice,
        sort: sortBy,
      }),
    );
  }, [
    dispatch,
    searchTerm,
    selectedCategoryId,
    selectedBrandId,
    maxPrice,
    sortBy,
  ]);

  const visibleProducts = shopProducts.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < shopProducts.length;

  const handleCategorySelect = (categoryId: number | null) => {
    setVisibleCount(PRODUCTS_PER_LOAD);
    setSelectedCategoryId(categoryId);

    const nextParams = new URLSearchParams(searchParams);

    if (categoryId === null) {
      nextParams.delete("categoryId");
    } else {
      nextParams.set("categoryId", String(categoryId));
    }

    setSearchParams(nextParams);
  };

  const handleBrandSelect = (brandId: number | null) => {
    setVisibleCount(PRODUCTS_PER_LOAD);
    setSelectedBrandId(brandId);
  };

  const handleMaxPriceChange = (price: number) => {
    setVisibleCount(PRODUCTS_PER_LOAD);
    setMaxPrice(price);
  };

  const handleSearchChange = (value: string) => {
    setVisibleCount(PRODUCTS_PER_LOAD);
    setSearchTerm(value);
  };

  const handleSortChange = (value: ProductSort) => {
    setVisibleCount(PRODUCTS_PER_LOAD);
    setSortBy(value);
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            <ShopSidebar
              selectedCategoryId={selectedCategoryId}
              selectedBrandId={selectedBrandId}
              maxPrice={maxPrice}
              onCategorySelect={handleCategorySelect}
              onBrandSelect={handleBrandSelect}
              onMaxPriceChange={handleMaxPriceChange}
            />
          </div>

          <div className="col-lg-9">
            <SortBar
              searchTerm={searchTerm}
              sortBy={sortBy}
              onSearchChange={handleSearchChange}
              onSortChange={handleSortChange}
            />

            {isLoading && (
              <div className="text-center py-5">Loading products...</div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            {!isLoading && !error && (
              <>
                <ProductGrid products={visibleProducts} />

                {hasMoreProducts && (
                  <div className="text-center mt-5">
                    <button
                      className="btn btn-outline-dark px-4"
                      onClick={() =>
                        setVisibleCount((prev) => prev + PRODUCTS_PER_LOAD)
                      }
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopPage;
