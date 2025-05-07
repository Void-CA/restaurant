export type Action = {
  label: string;
  icon?: React.ReactNode; // Ej: <FaUtensils />
  variant?: string;
  className?: string; // Para estilos adicionales
  onClick: () => void;
};
