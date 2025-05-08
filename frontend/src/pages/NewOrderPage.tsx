import React, { useState } from "react";
import ProductSearch from "../components/orders/ProductSearch";
import Cart from "../components/orders/Cart";
import ConfirmModal from "../components/orders/ConfirmModal";
import styles from "../styles/NewOrderPage.module.css";
import { Product, CartItem } from "../types/products"; // Asegúrate de que la ruta sea correcta

const NewOrderPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  // Agregar al carrito con control de cantidad
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingProduct = prev.find(
        (item) => item.product.id === product.id
      );

      if (existingProduct) {
        // Si ya existe, aumentamos la cantidad
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, lo agregamos con cantidad 1
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  // Eliminar un producto del carrito
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => {
      const existingProduct = prev.find((item) => item.product.id === id);

      if (existingProduct && existingProduct.quantity > 1) {
        // Si la cantidad es mayor a 1, decrementamos la cantidad
        return prev.map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // Si la cantidad es 1, eliminamos el producto
        return prev.filter((item) => item.product.id !== id);
      }
    });
  };
  const handleSendToKitchen = () => {
    setShowConfirm(false);
  };

  // Función para cancelar la orden
  const handleCancelOrder = () => {
    console.log("Orden cancelada");
    setCartItems([]); // Vaciar el carrito
    // Lógica para cancelar la orden
  };

  return (
    <div className={styles.newOrderContainer}>
      <div className={styles.productSearchSection}>
        <h1>Crear Orden</h1>
        <ProductSearch onAddToCart={handleAddToCart} />
      </div>
      <div className={styles.cartSection}>
        <Cart items={cartItems} onRemove={handleRemoveFromCart} />
        <div className={styles.actionButtons}>
          <button
            className={styles.sendButton}
            onClick={() => setShowConfirm(true)}
          >
            Enviar a cocina
          </button>
          {showConfirm && (
            <ConfirmModal
              message="Confirmar orden antes de enviar a cocina"
              items={cartItems}
              onConfirm={handleSendToKitchen}
              onCancel={() => setShowConfirm(false)}
            />
          )}
          <button className={styles.cancelButton} onClick={handleCancelOrder}>
            Cancelar orden
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrderPage;
