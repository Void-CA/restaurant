export interface OrderPayload {
  table: number; // id de la mesa
  items: {
    product: number;
    quantity: number;
  }[];
  status?: "pending" | "completed";
  bill?: number; // id de la factura, si aplica
}

export interface Order {
  id: number;
  table: number;
  status: "pending" | "completed";
  bill: number;
  created_at: string;
  updated_at: string;
  // puedes agregar más campos según tu modelo
}
