export interface OrderPayload {
  table: number; // id de la mesa
  items: {
    productId: number;
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

export const createOrder = async (orderPayload: OrderPayload) => {
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      throw new Error("Error al crear la orden");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en createOrder:", error);
    throw error;
  }
};
