import type { ApiResponse } from "../../../../app/api/apiResponse";
import api from "../../../../app/api/axios";
import { STOREFRONT_CONFIG } from "../../../../config/storefront-config";
import type { Product, ProductFilterParams } from "./productStoreFrontTypes";
export const getFeauturedProducts = async (): Promise<Product[]> => {
  const response = await api.get<ApiResponse<Product[]>>(
    `/products/featured?limit=${STOREFRONT_CONFIG.homepage.featuredProductsCount}`,
  );

  return response.data.data;
};

export const getNewArrivalsProducts = async (): Promise<Product[]> => {
  const response = await api.get<ApiResponse<Product[]>>(
    `/products/new-arrivals?limit=${STOREFRONT_CONFIG.homepage.newestProductsCount}`,
  );

  return response.data.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<ApiResponse<Product>>(`/products/${id}`);

  return response.data.data;
};

export const getShopProducts = async (
  filters?: ProductFilterParams,
): Promise<Product[]> => {
  const response = await api.get<ApiResponse<Product[]>>("/products", {
    params: {
      search: filters?.search || undefined,
      categoryId: filters?.categoryId ?? undefined,
      brandId: filters?.brandId ?? undefined,
      minPrice: filters?.minPrice ?? undefined,
      maxPrice: filters?.maxPrice ?? undefined,
      sort: filters?.sort || undefined,
    },
  });

  return response.data.data;
};

export const getProductsByCategory = async (
  categoryId: number,
): Promise<Product[]> => {
  const response = await api.get<ApiResponse<Product[]>>("/products", {
    params: {
      categoryId,
    },
  });

  return response.data.data;
};

export const getProductsByBrand = async (
  brandId: number,
): Promise<Product[]> => {
  const response = await api.get<ApiResponse<Product[]>>("/products", {
    params: {
      brandId,
    },
  });

  return response.data.data;
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await api.get<ApiResponse<Product>>(`/products/${slug}`);

  return response.data.data;
};
