import React, { useState } from "react";
import { createOrder } from "../services/orders"; // Asegúrate de que la ruta sea correcta
import ProductSearch from "../components/ProductSearch";
import Cart from "../components/Cart";
import ConfirmModal from "../components/ConfirmModal";
import styles from "../styles/NewOrderPage.module.css";
import { Product, CartItem } from "../types/products"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";
const NewOrderPage: React.FC = () => {
  const navigate = useNavigate();
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

  const handleRemoveFromCart = (id: number, action: "decrease" | "remove") => {
    setCartItems((prev) => {
      const existingProduct = prev.find((item) => item.product.id === id);

      if (!existingProduct) return prev;

      if (action === "decrease") {
        // Decrease quantity if greater than 1
        if (existingProduct.quantity > 1) {
          return prev.map((item) =>
            item.product.id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          // If quantity is 1, remove the product
          return prev.filter((item) => item.product.id !== id);
        }
      } else if (action === "remove") {
        // Completely remove the product
        return prev.filter((item) => item.product.id !== id);
      }

      return prev;
    });
  };
  const handleSendToKitchen = async () => {
    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        status: "enviada",
      };

      await createOrder(orderPayload);
      setCartItems([]);
      navigate("/");
    } catch (error) {
      console.error("Error al crear la orden:", error);
    } finally {
      setShowConfirm(false);
    }
  };

  // Función para cancelar la orden
  const handleCancelOrder = () => {
    console.log("Orden cancelada");
    setCartItems([]); // Vaciar el carrito
    navigate("/");
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
