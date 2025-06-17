import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { Action } from "../types/modals";

type Props = {
  show: boolean;
  title: string;
  message?: string;
  actions: Action[];
  onClose: () => void;
};

const ActionModal: React.FC<Props> = ({
  show,
  title,
  message,
  actions,
  onClose,
}) => {
  return (
    <Dialog open={show} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontWeight="bold" fontSize={"36px"}>
          {title}
        </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {message && (
          <Typography variant="body1" mb={2}>
            {message}
          </Typography>
        )}

        <Grid container spacing={2}>
          {actions.map((action, index) => (
            <Grid key={index} {...({} as any)}>
              <Button
                fullWidth
                onClick={action.onClick}
                variant={action.variant || "contained"}
                color={action.color || "primary"}
                startIcon={action.icon}
                sx={{
                  py: 2,
                  fontSize: "1.1rem",
                  textTransform: "none",
                }}
              >
                {action.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ py: 2, fontSize: "1.1rem", textTransform: "none" }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionModal;
