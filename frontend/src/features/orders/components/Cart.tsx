import React from "react";
import { CartItem } from "../types/products";

interface CartProps {
  items: CartItem[];
  onRemove: (id: number, action: "decrease" | "remove") => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove }) => {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Carrito</h2>
      {items.map((item) => (
        <div key={item.product.id}>
          <span>{item.product.name}</span>
          <span>Cantidad: {item.quantity}</span>
          <span>${item.product.price * item.quantity}</span>
          <button onClick={() => onRemove(item.product.id, "decrease")}>
            -
          </button>
          <button onClick={() => onRemove(item.product.id, "remove")}>
            Eliminar
          </button>
        </div>
      ))}
      <div>
        <strong>Total: ${total}</strong>
      </div>
    </div>
  );
};

export default Cart;
