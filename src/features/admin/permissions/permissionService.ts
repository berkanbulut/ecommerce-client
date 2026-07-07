import api from "../../../app/api/axios";
import type {
  CreatePermissionRequest,
  Permission,
  UpdatePermissionRequest,
} from "./permissionType";
import type { ApiResponse } from "../../../app/api/apiResponse";

export const getPermissions = async (): Promise<Permission[]> => {
  const response =
    await api.get<ApiResponse<Permission[]>>("/admin/permissions");
  return response.data.data;
};

export const createPermissions = async (
  data: CreatePermissionRequest,
): Promise<Permission> => {
  const response = await api.post<ApiResponse<Permission>>(
    "/admin/permissions",
    data,
  );
  return response.data.data;
};

export const updatePermission = async (
  data: UpdatePermissionRequest,
): Promise<Permission> => {
  const { id, ...payload } = data;

  const response = await api.patch<ApiResponse<Permission>>(
    `/admin/permissions/${id}`,
    payload,
  );
  return response.data.data;
};

export const deletePermission = async (id: number): Promise<void> => {
  await api.delete<ApiResponse<[]>>(`/admin/permissions/${id}`);
};
