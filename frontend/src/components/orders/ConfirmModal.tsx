import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { CartItem } from "../../types/products";

type ConfirmModalProps = {
  message: string;
  items?: CartItem[];
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  items,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography fontSize={"24px"} fontWeight={"bold"}>
          {message}
        </Typography>
      </DialogTitle>

      {items && items.length > 0 && (
        <DialogContent dividers>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Cantidad</strong>
                </TableCell>
                <TableCell>
                  <strong>Producto</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.product.id}>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.product.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      )}

      <DialogActions>
        <Button variant="contained" color="success" onClick={onConfirm}>
          Confirmar
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
