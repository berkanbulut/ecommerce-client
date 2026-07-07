import type { ApiResponse } from "../../../../app/api/apiResponse";
import api from "../../../../app/api/axios";

import type { CreateOrderRequest, Order } from "./orderTypes";

export const createOrder = async (data: CreateOrderRequest): Promise<Order> => {
  const response = await api.post<ApiResponse<Order>>("/orders", data);

  return response.data.data;
};

export const getMyOrders = async (): Promise<Order[]> => {
  const response = await api.get<ApiResponse<Order[]>>("/orders");

  return response.data.data;
};

export const getMyOrderById = async (id: number): Promise<Order> => {
  const response = await api.get<ApiResponse<Order>>(`/orders/${id}`);

  return response.data.data;
};
