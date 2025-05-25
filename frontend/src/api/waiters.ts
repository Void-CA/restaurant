// src/api/waiters.ts
import client from "./api_client";
import { Waiter } from "../types/models";

export const getWaiterByPhone = (phone: string) => {
  return client.get<Waiter>(`/waiters/by-phone/${phone}`);
};
