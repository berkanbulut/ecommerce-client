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
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
      <h4 className="fw-bold mb-0">Shop Products</h4>

      <div className="d-flex flex-column flex-sm-row gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ minWidth: "250px" }}
        />

        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as ProductSort)}
          style={{ minWidth: "220px" }}
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A - Z</option>
          <option value="name_desc">Name: Z - A</option>
        </select>
      </div>
    </div>
  );
}

export default SortBar;
