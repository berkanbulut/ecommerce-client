import api from "../../../app/api/axios";
import type {
  CreateUserRequest,
  User,
  UpdateUserRequest,
  UpdateUserPasswordRequest,
  UpdateUserRolesRequest,
} from "./userTypes";
import type { ApiResponse } from "../../../app/api/apiResponse";
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<ApiResponse<User[]>>("/admin/users");
  return response.data.data;
};

export const createUser = async (data: CreateUserRequest): Promise<User> => {
  const response = await api.post<ApiResponse<User>>("/admin/users", data);
  return response.data.data;
};
export const updateUser = async (data: UpdateUserRequest): Promise<User> => {
  const { id, ...payload } = data;
  const response = await api.patch<ApiResponse<User>>(
    `/admin/users/${id}`,
    payload,
  );
  return response.data.data;
};
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete<ApiResponse<[]>>(`/admin/users/${id}`);
};

export const updateUserPassword = async (
  data: UpdateUserPasswordRequest,
): Promise<void> => {
  const { id, newPassword } = data;

  await api.patch<ApiResponse<[]>>(`/admin/users/${id}/password`, {
    newPassword,
  });
};

export const updateUserRoles = async (
  data: UpdateUserRolesRequest,
): Promise<User> => {
  const { id, roles } = data;

  const response = await api.patch<ApiResponse<User>>(
    `/admin/users/${id}/roles`,
    {
      roles,
    },
  );

  return response.data.data;
};
