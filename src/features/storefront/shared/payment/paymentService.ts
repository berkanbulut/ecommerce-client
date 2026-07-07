import type { ApiResponse } from "../../../../app/api/apiResponse";
import api from "../../../../app/api/axios";

import type {
  CreateStripeCheckoutSessionRequest,
  StripeCheckoutSessionResponse,
} from "./paymentTypes";

export const createStripeCheckoutSession = async (
  data: CreateStripeCheckoutSessionRequest,
): Promise<StripeCheckoutSessionResponse> => {
  const response = await api.post<ApiResponse<StripeCheckoutSessionResponse>>(
    "/payments/stripe/checkout-session",
    data,
  );

  return response.data.data;
};
