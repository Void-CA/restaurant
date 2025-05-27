interface OrderPayload {
  items: {
    productId: number;
    quantity: number;
  }[];
  status: string;
}

export const createOrder = async (orderPayload: OrderPayload) => {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      throw new Error('Error al crear la orden');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en createOrder:', error);
    throw error;
  }
}; 