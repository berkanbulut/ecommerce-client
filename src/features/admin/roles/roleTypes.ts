export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissions: string[];
}

export interface UpdateRoleRequest {
  id: number;
  description: string;
}

export interface SetRolePermissionsRequest {
  id: number;
  permissions: string[];
}
