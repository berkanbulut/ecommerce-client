export interface ApiResponse<T> {
  data: T;
  errors: string[] | null;
  message: string;
  success: boolean;
  timestamp: string;
}
