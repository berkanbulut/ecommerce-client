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

  active: boolean;
  featured: boolean;

  mainImageUrl: string;

  images: ProductImage[];

  categoryId: number;
  brandId: number;
}

/* CREATE PRODUCT REQUEST */

export interface CreateProductRequest {
  name: string;
  slug: string;

  shortDescription: string;
  description: string;

  price: number;
  salePrice: number;

  currency: string;

  stockQuantity: number;

  active: boolean;
  featured: boolean;

  mainImageUrl: string;

  images: ProductImage[];

  categoryId: number;
  brandId: number;
}

/* IMAGE UPLOAD RESPONSE */

export type UploadImageResponse = string;

/* PRODUCT STATE */

export interface ProductState {
  products: Product[];

  selectedProduct: Product | null;

  uploadedMainImageUrl: string | null;

  uploadedGalleryUrls: string[];

  isLoading: boolean;

  error: string | null;
}
