import api from "../../../app/api/axios";
import type {
  Brand,
  CreateBrandRequest,
  UpdateBrandRequest,
} from "./brandTypes";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  localDateTime: string;
}

export const getBrands = async (): Promise<Brand[]> => {
  const response = await api.get<ApiResponse<Brand[]>>("/admin/brands");
  return response.data.data;
};

export const createBrand = async (data: CreateBrandRequest): Promise<Brand> => {
  const response = await api.post<ApiResponse<Brand>>("/admin/brands", data);
  return response.data.data;
};

export const updateBrand = async (data: UpdateBrandRequest): Promise<Brand> => {
  const { id, ...payload } = data;
  const response = await api.put<ApiResponse<Brand>>(
    `/admin/brands/${id}`,
    payload,
  );
  return response.data.data;
};

export const deleteBrand = async (id: number): Promise<void> => {
  await api.delete<ApiResponse<null>>(`/admin/brands/${id}`);
};
