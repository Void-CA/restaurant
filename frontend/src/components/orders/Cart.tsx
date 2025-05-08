import React from "react";
import {
  Paper,
  Typography,
  Stack,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import { FaMinus } from "react-icons/fa";
import { CartProps } from "../../types/products";

const Cart: React.FC<CartProps> = ({ items, onRemove }) => {
  const total = items.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0
  );

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Carrito
      </Typography>

      {items.length > 0 ? (
        <>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Typography sx={{ width: "15%" }}>Cantidad</Typography>
            <Typography sx={{ width: "40%" }}>Producto</Typography>
            <Typography sx={{ width: "25%" }}>Precio</Typography>
            <Typography sx={{ width: "20%" }}>Acción</Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />

          {items.map((cartItem) => (
            <Stack
              key={cartItem.product.id}
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Typography sx={{ width: "15%" }}>{cartItem.quantity}</Typography>
              <Typography sx={{ width: "40%" }}>
                {cartItem.product.name}
              </Typography>
              <Typography sx={{ width: "25%" }}>
                ${cartItem.product.price.toFixed(2)}
              </Typography>
              <Box sx={{ width: "20%" }}>
                <IconButton
                  onClick={() => onRemove(cartItem.product.id)}
                  color="error"
                >
                  <FaMinus />
                </IconButton>
              </Box>
            </Stack>
          ))}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" align="right">
            Total: ${total.toFixed(2)}
          </Typography>
        </>
      ) : (
        <Typography>No hay productos en el carrito</Typography>
      )}
    </Paper>
  );
};

export default Cart;
