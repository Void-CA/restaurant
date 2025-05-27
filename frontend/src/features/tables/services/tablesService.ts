import { Table } from "../types/tables";
import { api } from "../../../core/api";

export const tablesService = {
  getTables: async (): Promise<Table[]> => {
    const response = await api.get<Table[]>("/tables/");
    return response.data;
  },

  getTable: async (id: number): Promise<Table> => {
    const response = await api.get<Table>(`/tables/${id}/`);
    return response.data;
  },

  updateTableStatus: async (
    id: number,
    status: Table["status"]
  ): Promise<Table> => {
    const response = await api.patch<Table>(`/tables/${id}/`, { status });
    return response.data;
  },
};
