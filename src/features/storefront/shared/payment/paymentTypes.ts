export interface CreateStripeCheckoutSessionRequest {
  orderId: number;
}

export interface StripeCheckoutSessionResponse {
  sessionId: string;
  url: string;
}
