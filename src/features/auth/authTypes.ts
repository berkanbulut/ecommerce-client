export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
export interface AuthResponse {
  id: number;
  name: string;
  email: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
}
export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
}
