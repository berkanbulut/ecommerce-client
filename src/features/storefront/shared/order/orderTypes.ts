export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type PaymentMethod = "CASH_ON_DELIVERY" | "CARD";

export interface CreateOrderRequest {
  paymentMethod: PaymentMethod;
  shippingFullName: string;
  shippingPhone: string;
  shippingAddressLine: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostalCode: string;
  customerNote?: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productSlug: string;
  productImageUrl: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: number;
  orderNumber: string;

  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;

  paymentProvider: string | null;
  paymentTransactionId: string | null;

  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  grandTotal: number;
  currency: string;

  shippingFullName: string;
  shippingPhone: string;
  shippingAddressLine: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostalCode: string;
  customerNote: string | null;

  items: OrderItem[];

  createdAt: string;
  updatedAt: string;
}

export interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}
