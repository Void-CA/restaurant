import axios from "axios";

const BASE_URL = "http://localhost:8000/api"; // Puedes poner esto en un archivo de configuración si prefieres

export const getTables = () => {
  return axios.get(`${BASE_URL}/tables/`);
};

export const updateTableStatus = (tableId: number, status: string) => {
  return axios.patch(`${BASE_URL}/tables/${tableId}/status/`, { status });
};
