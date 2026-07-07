import api from "../../../../app/api/axios";
import type { Brand } from "./brandStoreFrontTypes";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  localDateTime: string;
}

export const getBrandsStoreFront = async (): Promise<Brand[]> => {
  const response = await api.get<ApiResponse<Brand[]>>("/brands");
  return response.data.data;
};

export const getBrandsShop = async (): Promise<Brand[]> => {
  const response = await api.get<ApiResponse<Brand[]>>("/brands");
  return response.data.data;
};
