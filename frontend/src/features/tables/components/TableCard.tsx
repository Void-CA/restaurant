import React from "react";
import { MdTableRestaurant } from "react-icons/md";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { Table } from "../types/tables"; // Asegúrate de que la ruta sea correcta

type Props = {
  table: Table;
  onClick: () => void;
};

const TableCard: React.FC<Props> = ({ table, onClick }) => {
  const getColor = () => {
    switch (table.status) {
      case "available":
        return "#4caf50"; // Verde
      case "occupied":
        return "#f44336"; // Rojo
      case "reserved":
        return "#ff9800"; // Naranja
      case "cleaning":
        return "#2196f3"; // Azul
      default:
        return "#9e9e9e"; // Gris
    }
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        maxWidth: 250,
        cursor: "pointer",
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ textAlign: "center", bgcolor: `${getColor()}20` }}>
        <Box sx={{ color: getColor(), mb: 1 }}>
          <MdTableRestaurant size={48} />
        </Box>
        <Typography variant="h6" fontWeight="bold">
          Mesa {table.table_number}
        </Typography>
        <Chip
          label={table.status.toUpperCase()}
          sx={{
            mt: 1,
            bgcolor: `${getColor()}50`,
            color: "#000",
            fontWeight: "bold",
          }}
        />
      </CardContent>
    </Card>
  );
};

export default TableCard;
