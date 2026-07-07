export interface ProductImage {
  imageUrl: string;
  sortOrder: number;
}

export interface Product {
  id: number;

  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;

  price: number;
  salePrice: number;

  currency: string;

  stockQuantity: number;
  stockStatus: string;

  active: boolean;
  featured: boolean;

  mainImageUrl: string;

  images: ProductImage[];

  categoryId: number;
  brandId: number;
}

export type ProductSort =
  | "newest"
  | "price_asc"
  | "price_desc"
  | "name_asc"
  | "name_desc";

export interface ProductFilterParams {
  search?: string;
  categoryId?: number | null;
  brandId?: number | null;
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSort;
}

export interface ProductState {
  featuredProducts: Product[];

  newArrivals: Product[];

  shopProducts: Product[];

  selectedProduct: Product | null;

  uploadedMainImageUrl: string | null;

  uploadedGalleryUrls: string[];

  isLoading: boolean;

  error: string | null;
}
