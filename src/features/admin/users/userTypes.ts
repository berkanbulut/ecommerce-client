export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
  authorities: string[];
  enabled: boolean;
  accountLocked: boolean;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  roles: string[];
}
export interface Role {
  id: number;
  name: string; // ROLE_ADMIN, ROLE_EDITOR
}

export interface UpdateUserRolesRequest {
  id: number;
  roles: string[];
}

export interface UpdateUserRequest {
  id: number;
  email: string;
  username?: string;
  password?: string;
  roles?: string[];
  enabled?: boolean;
  accountLocked?: boolean;
}
export interface UpdateUserPasswordRequest {
  id: number;
  newPassword: string;
}
