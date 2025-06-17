// billsService.ts
import api from "../../../api/api_client";

export const billsService = {
  createBill: (payload: { table: number; status?: string }) =>
    api.post("/bills/", payload).then((res) => res.data),

  getBills: (tableId: number, status: string) =>
    api
      .get(`/bills/${tableId}`, { params: { status } })
      .then((res) => res.data),

  updateBill: (id: number, payload: { status: string }) =>
    api.put(`/bills/${id}`, payload).then((res) => res.data),

  deleteBill: (id: number) =>
    api.delete(`/bills/${id}`).then((res) => res.data),
};
