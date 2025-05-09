// src/api/waiters.ts
import axios from "axios";
import { Waiter } from "../types/models";

const BASE_URL = "http://localhost:8000/api";

export const getWaiterByPhone = (phone: string) => {
  return axios.get<Waiter>(`${BASE_URL}/waiters/by-phone/${phone}`);
};
