export type Action = {
  label: string;
  icon?: React.ReactNode; // Ej: <FaUtensils />
  variant?: "contained" | "outlined" | "text"; // ← estilo del botón
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  className?: string; // Para estilos adicionales
  onClick: () => void;
};
