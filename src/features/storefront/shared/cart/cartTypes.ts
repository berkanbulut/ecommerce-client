export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productSlug: string;
  productImageUrl: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  currency: string;
  availableStock: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  currency: string | null;
}

export interface AddCartItemRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface ApiResponse<T> {
  data: T;
  errors: unknown;
  message: string;
  success: boolean;
  timestamp: string;
}
