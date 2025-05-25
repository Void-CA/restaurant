import client from "./api_client";

export const getTables = () => {
  return client.get("/tables/");
};

export const updateTableStatus = (tableId: number, status: string) => {
  return client.patch(`/tables/${tableId}/status/`, { status });
};
