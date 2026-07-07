import api from "../../../app/api/axios";
import type {
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
  SetRolePermissionsRequest,
} from "./roleTypes";
import type { ApiResponse } from "../../../app/api/apiResponse";

export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get<ApiResponse<Role[]>>("/admin/roles");
  return response.data.data;
};

export const createRole = async (data: CreateRoleRequest): Promise<Role> => {
  const response = await api.post<ApiResponse<Role>>("/admin/roles", {
    name: data.name,
    description: data.description,
  });

  const createdRole = response.data.data;

  const permissionsResponse = await api.patch<ApiResponse<Role>>(
    `/admin/roles/${createdRole.id}/permissions`,
    {
      permissions: data.permissions ?? [],
    },
  );

  return permissionsResponse.data.data;
};

export const updateRole = async (data: UpdateRoleRequest): Promise<Role> => {
  const { id, ...payload } = data;
  const response = await api.patch<ApiResponse<Role>>(
    `/admin/roles/${id}`,
    payload,
  );
  return response.data.data;
};

export const setPermission = async (
  data: SetRolePermissionsRequest,
): Promise<Role> => {
  const { id, permissions } = data;
  console.log("huuhuh0", data);
  const response = await api.patch<ApiResponse<Role>>(
    `/admin/roles/${id}/permissions`,
    {
      permissions: permissions,
    },
  );
  console.log("huhuhuh", response);
  return response.data.data;
};

export const deleteRole = async (id: number): Promise<void> => {
  await api.delete<ApiResponse<[]>>(`/admin/roles/${id}`);
};
