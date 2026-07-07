import api from "../../app/api/axios";
import type {
  RegisterRequest,
  User,
  LoginRequest,
  LoginResponse,
} from "./authTypes";

export const registerUser = async (data: RegisterRequest): Promise<User> => {
  const response = await api.post("/auth/register", data);
  return response.data.data;
};

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data.data;
};

export const refreshUser = async (): Promise<LoginResponse> => {
  const response = await api.post("/auth/refresh");
  return response.data.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};
