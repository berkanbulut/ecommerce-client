import { useEffect } from "react";
import AdminDataTable from "../../../shared/ui/table/AdminDataTable";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/api/store";
import { toast } from "react-toastify";

import { handleGetOrders, handleUpdateOrder } from "../orderSlice";

import type { Order, OrderStatus, PaymentStatus } from "../orderTypes";

const orderStatusOptions: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const paymentStatusOptions: PaymentStatus[] = [
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
];

const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { orders, isLoading, error } = useSelector(
    (state: RootState) => state.order,
  );

  useEffect(() => {
    dispatch(handleGetOrders());
  }, [dispatch]);

  const handleOrderStatusChange = async (
    order: Order,
    orderStatus: OrderStatus,
  ) => {
    const result = await dispatch(
      handleUpdateOrder({
        id: order.id,
        payload: {
          orderStatus,
        },
      }),
    );

    if (handleUpdateOrder.fulfilled.match(result)) {
      toast.success("Order status updated");
    } else {
      toast.error("Order update failed");
    }
  };

  const handlePaymentStatusChange = async (
    order: Order,
    paymentStatus: PaymentStatus,
  ) => {
    const result = await dispatch(
      handleUpdateOrder({
        id: order.id,
        payload: {
          paymentStatus,
          paymentProvider: order.paymentProvider ?? "CASH",
          paymentTransactionId:
            order.paymentTransactionId ?? `CASH-ORDER-${order.id}`,
        },
      }),
    );

    if (handleUpdateOrder.fulfilled.match(result)) {
      toast.success("Payment status updated");
    } else {
      toast.error("Payment update failed");
    }
  };

  const formatPrice = (amount: number, currency: string) => {
    return `${amount} ${currency}`;
  };

  if (isLoading && orders.length === 0) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <AdminDataTable
      title="Orders"
      createButtonLabel="Refresh"
      onCreate={() => dispatch(handleGetOrders())}
      headers={[
        "Order No",
        "Customer",
        "Email",
        "Total",
        "Order Status",
        "Payment Status",
        "Created At",
      ]}
    >
      {orders.map((order) => (
        <tr key={order.id}>
          <td>{order.orderNumber}</td>
          <td>{order.username}</td>
          <td>{order.email}</td>
          <td>{formatPrice(order.grandTotal, order.currency)}</td>

          <td>
            <select
              className="form-select form-select-sm"
              value={order.orderStatus}
              onChange={(e) =>
                handleOrderStatusChange(order, e.target.value as OrderStatus)
              }
            >
              {orderStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </td>

          <td>
            <select
              className="form-select form-select-sm"
              value={order.paymentStatus}
              onChange={(e) =>
                handlePaymentStatusChange(
                  order,
                  e.target.value as PaymentStatus,
                )
              }
            >
              {paymentStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </td>

          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
        </tr>
      ))}
    </AdminDataTable>
  );
};

export default OrdersPage;
