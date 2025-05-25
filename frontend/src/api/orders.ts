import client from "./api_client";
import { CreateOrderPayload, Order } from "../types/models";

export const createOrder = (order: CreateOrderPayload) => {
  return client.post<Order>("/orders/", order);
};

export const getOrders = () => {
  return client.get<Order[]>("/orders/");
};

export const getOrderById = (orderId: number) => {
  return client.get<Order>(`/orders/${orderId}/`);
};

export const updateOrderStatus = (
  orderId: number,
  status: "pending" | "completed"
) => {
  return client.patch(`/orders/${orderId}/status/`, { status });
};
