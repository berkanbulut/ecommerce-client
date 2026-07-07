import api from "../../../app/api/axios";
import type { ApiResponse } from "../../../app/api/apiResponse";

import type { Order, UpdateOrderRequest } from "./orderTypes";

/* GET ALL ORDERS */

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get<ApiResponse<Order[]>>("/admin/orders");

  return response.data.data;
};

/* GET ORDER BY ID */

export const getOrderById = async (id: number): Promise<Order> => {
  const response = await api.get<ApiResponse<Order>>(`/admin/orders/${id}`);

  return response.data.data;
};

/* UPDATE ORDER */

export const updateOrder = async (
  id: number,
  data: UpdateOrderRequest,
): Promise<Order> => {
  const response = await api.patch<ApiResponse<Order>>(
    `/admin/orders/${id}`,
    data,
  );

  return response.data.data;
};
