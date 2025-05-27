import React from "react";
import { CartItem } from "../types/products";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

interface ConfirmModalProps {
  open: boolean;
  message: string;
  items: CartItem[];
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  message,
  items,
  onConfirm,
  onCancel,
}) => {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{message}</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          {items.map((item) => (
            <Stack
              key={item.product.id}
              direction="row"
              justifyContent="space-between"
            >
              <Typography>{item.product.name}</Typography>
              <Typography>x{item.quantity}</Typography>
              <Typography>${item.product.price * item.quantity}</Typography>
            </Stack>
          ))}
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" align="right">
          Total: ${total}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={onConfirm}>
          Confirmar
        </Button>
        <Button variant="outlined" color="error" onClick={onCancel}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
