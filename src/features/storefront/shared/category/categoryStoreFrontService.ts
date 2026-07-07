import api from "../../../../app/api/axios";
import type { Category } from "./categoryStoreFrontTypes";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  localDateTime: string;
}

export const getCategoriesStoreFront = async (): Promise<Category[]> => {
  const response = await api.get<ApiResponse<Category[]>>("/categories");

  return response.data.data;
};

export const getCategoriesShop = async (): Promise<Category[]> => {
  const response = await api.get<ApiResponse<Category[]>>("/categories");

  return response.data.data;
};

export const getCategoriesBy = async (): Promise<Category[]> => {
  const response = await api.get<ApiResponse<Category[]>>("/categories");

  return response.data.data;
};

