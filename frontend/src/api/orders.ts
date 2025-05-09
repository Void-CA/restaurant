import axios from "axios";
import { CreateOrderPayload, Order } from "../types/models";

const BASE_URL = "http://localhost:8000/api";

export const createOrder = (order: CreateOrderPayload) => {
  return axios.post<Order>(`${BASE_URL}/orders/`, order);
};

export const getOrders = () => {
  return axios.get<Order[]>(`${BASE_URL}/orders/`);
};

export const getOrderById = (orderId: number) => {
  return axios.get<Order>(`${BASE_URL}/orders/${orderId}/`);
};

export const updateOrderStatus = (
  orderId: number,
  status: "pending" | "completed"
) => {
  return axios.patch(`${BASE_URL}/orders/${orderId}/status/`, { status });
};
