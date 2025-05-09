export interface Table {
  id: number;
  table_number: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Waiter {
  id: number;
  name: string;
  phone_number: string;
}

export interface OrderItem {
  id?: number; // solo estará si ya existe
  product: Product;
  quantity: number;
  note?: string | null;
}

export interface Order {
  id?: number;
  table: number | Table;
  waiter: number | Waiter;
  status: "pending" | "completed";
  bill: number | Bill;
  created_at?: string;
  updated_at?: string;
  items: OrderItem[];
}

export interface Bill {
  id: number;
  table: Table;
  status: "open" | "closed";
  created_at: string;
  closed_at: string | null;
  orders?: Order[];
}

// Payload para enviar una orden (simplificada)
export interface CreateOrderPayload {
  table: number;
  waiter: number;
  bill: number;
  items: {
    product: number;
    quantity: number;
    note?: string;
  }[];
}
