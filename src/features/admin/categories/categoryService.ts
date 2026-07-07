import api from "../../../app/api/axios";
import type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "./categoryTypes";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  localDateTime: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<ApiResponse<Category[]>>("/admin/categories");

  return response.data.data;
};

export const createCategory = async (
  data: CreateCategoryRequest,
): Promise<Category> => {
  const response = await api.post<ApiResponse<Category>>(
    "/admin/categories",
    data,
  );

  return response.data.data;
};

export const updateCategory = async (
  data: UpdateCategoryRequest,
): Promise<Category> => {
  const { id, ...payload } = data;

  const response = await api.put<ApiResponse<Category>>(
    `/admin/categories/${id}`,
    payload,
  );

  return response.data.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete<ApiResponse<null>>(`/admin/categories/${id}`);
};
