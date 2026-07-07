import api from "../../../../app/api/axios";
import type {
  AddCartItemRequest,
  ApiResponse,
  Cart,
  UpdateCartItemRequest,
} from "./cartTypes";

const CART_URL = "/cart";

const getCart = async (): Promise<Cart> => {
  const response = await api.get<ApiResponse<Cart>>(CART_URL);
  return response.data.data;
};

const addItem = async (payload: AddCartItemRequest): Promise<Cart> => {
  const response = await api.post<ApiResponse<Cart>>(
    `${CART_URL}/items`,
    payload,
  );

  return response.data.data;
};

const updateItem = async (
  cartItemId: number,
  payload: UpdateCartItemRequest,
): Promise<Cart> => {
  const response = await api.patch<ApiResponse<Cart>>(
    `${CART_URL}/items/${cartItemId}`,
    payload,
  );

  return response.data.data;
};

const removeItem = async (cartItemId: number): Promise<Cart> => {
  const response = await api.delete<ApiResponse<Cart>>(
    `${CART_URL}/items/${cartItemId}`,
  );

  return response.data.data;
};

const clearCart = async (): Promise<Cart> => {
  const response = await api.delete<ApiResponse<Cart>>(`${CART_URL}/clear`);
  return response.data.data;
};

const cartService = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
};

export default cartService;
