import { api } from "../../../core/api";
import { Order, OrderPayload } from "../types/orders";

export const ordersService = {
  createOrder: async (orderPayload: OrderPayload): Promise<Order> => {
    const response = await api.post<Order>("/orders/", orderPayload);
    return response.data;
  },
};
