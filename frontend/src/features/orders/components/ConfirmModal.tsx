import React from 'react';
import { CartItem } from '../types/products';

interface ConfirmModalProps {
  message: string;
  items: CartItem[];
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  items,
  onConfirm,
  onCancel,
}) => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{message}</h3>
        <div className="order-summary">
          {items.map((item) => (
            <div key={item.product.id}>
              <span>{item.product.name}</span>
              <span>x{item.quantity}</span>
              <span>${item.product.price * item.quantity}</span>
            </div>
          ))}
          <div className="total">
            <strong>Total: ${total}</strong>
          </div>
        </div>
        <div className="modal-actions">
          <button onClick={onConfirm}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 