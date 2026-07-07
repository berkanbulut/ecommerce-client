import api from "../../../app/api/axios";
import type { ApiResponse } from "../../../app/api/apiResponse";

import type {
  Product,
  CreateProductRequest,
  UploadImageResponse,
} from "./productTypes";

/* GET PRODUCTS */

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ApiResponse<Product[]>>("/admin/products");

  return response.data.data;
};

/* GET PRODUCT BY ID */

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<ApiResponse<Product>>(`/admin/products/${id}`);

  return response.data.data;
};

/* CREATE PRODUCT */

export const createProduct = async (
  data: CreateProductRequest,
): Promise<Product> => {
  const response = await api.post<ApiResponse<Product>>(
    "/admin/products",
    data,
  );

  return response.data.data;
};

/* UPLOAD IMAGE */

export const uploadImage = async (file: File): Promise<UploadImageResponse> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<ApiResponse<string>>(
    "/admin/images/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.data;
};
/* UPDATE PRODUCT*/

export const updateProduct = async (
  id: number,
  data: CreateProductRequest,
): Promise<Product> => {
  const response = await api.patch<ApiResponse<Product>>(
    `/admin/products/${id}`,
    data,
  );

  return response.data.data;
};

/* DELETE PRODUCT */

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete<ApiResponse<[]>>(`/admin/products/${id}`);
};
