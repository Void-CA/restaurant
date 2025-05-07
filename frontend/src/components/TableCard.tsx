import React from "react";
import { MdTableRestaurant } from "react-icons/md";

type Table = {
  id: number;
  table_number: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
};

type Props = {
  table: Table;
  onClick: () => void;
};

const TableCard: React.FC<Props> = ({ table, onClick }) => {
  const getColor = () => {
    switch (table.status) {
      case "available":
        return "text-success"; // Verde
      case "occupied":
        return "text-danger"; // Rojo
      case "reserved":
        return "text-muted"; // Amarillo
      case "cleaning":
        return "text-info"; // Azul
      default:
        return "text-muted"; // Gris
    }
  };

  const getBackground = () => {
    switch (table.status) {
      case "available":
        return "bg-success"; // Verde
      case "occupied":
        return "bg-danger"; // Rojo
      case "reserved":
        return "bg-secondary"; // Amarillo
      case "cleaning":
        return "bg-info"; // Azul
      default:
        return "bg-secondary"; // Gris
    }
  };

  return (
    <div
      className="card shadow-sm border-1 "
      onClick={onClick}
      style={{ cursor: "pointer", maxWidth: "18rem" }}
    >
      <div className={`card-body text-center ${getBackground()} bg-opacity-10`}>
        {/* Ícono con color dinámico */}
        <MdTableRestaurant size={48} className={`${getColor()}`} />
        <h5 className="card-title fw-bold">Mesa {table.table_number}</h5>
        <p className={`badge text-dark text-uppercase`}>{table.status}</p>
      </div>
    </div>
  );
};

export default TableCard;
