import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  useMediaQuery,
  Divider,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface LoginFormProps {
  username: string;
  password: string;
  loading: boolean;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loginMessage: string;
  logo: string;
  theme: any;
  restaurantName: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  loading,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  loginMessage,
  logo,
  theme,
  restaurantName,
}) => {
  const isLarge = useMediaQuery("(min-width:900px)");

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        width: isLarge ? 1000 : 420,
        maxWidth: "98vw",
        backgroundColor: "rgba(56, 56, 56, 0.85)",
        border: `3px solid ${theme.primary_color || "#FFD600"}`,
        p: isLarge ? 8 : 4,
        borderRadius: 6,
        boxShadow: 16,
        display: "flex",
        flexDirection: isLarge ? "row" : "column",
        alignItems: "center",
        gap: isLarge ? 8 : 3,
        color: "#fff",
      }}
    >
      {/* Logo y mensaje */}
      <Box
        sx={{
          flex: 1,
          textAlign: "center",
          mb: isLarge ? 0 : 1,
        }}
      >
        <img
          src={logo}
          alt={restaurantName}
          style={{
            width: isLarge ? 400 : 250,
            marginBottom: isLarge ? 24 : 0,
            filter: "drop-shadow(0 0 10px #FFD600)",
          }}
        />
      </Box>
      {/* Formulario */}
      <Stack spacing={4} sx={{ flex: 1, minWidth: isLarge ? 340 : "auto" }}>
        <TextField
          label={
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <PersonIcon
                sx={{
                  fontSize: isLarge ? 22 : 18,
                  mr: 0.5,
                  color: theme.palette?.highlight?.main || theme.highlight_color || "#fffed6",
                }}
              />
              Usuario
            </span>
          }
          variant="outlined"
          fullWidth
          value={username}
          onChange={onUsernameChange}
          margin="normal"
          required
          size={isLarge ? "medium" : "small"}
          InputProps={{
            sx: {
              fontSize: isLarge ? "1.5rem" : "1.1rem",
              color: "#fffed6",
              backgroundColor: "rgba(33,33,33,0.8)",
              borderRadius: 5,
            },
          }}
          InputLabelProps={{
            sx: {
              fontSize: isLarge ? "1.2rem" : "1.1rem",
              color: theme.palette?.highlight?.main || theme.highlight_color || "#fffed6",
              "&.Mui-focused": {
                color: theme.palette?.highlight?.main || theme.highlight_color || "#fffed6",
              },
              "&.MuiInputLabel-shrink": {
                color: theme.palette?.highlight?.main || theme.highlight_color || "#fffed6",
              },
            },
            required: false,
            shrink: undefined,
          }}
          FormHelperTextProps={{
            required: false,
          }}
          inputProps={{ "aria-required": false }}
        />
        <TextField
          label={
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <LockOutlinedIcon
                sx={{
                  fontSize: isLarge ? 22 : 18,
                  mr: 0.5,
                  color: theme.palette?.highlight?.main || theme.highlight_color || "#fffed6",
                }}
              />
              Contraseña
            </span>
          }
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={onPasswordChange}
          margin="normal"
          required
          size={isLarge ? "medium" : "small"}
          InputProps={{
            sx: {
              fontSize: isLarge ? "1.5rem" : "1.1rem",
              color: "#fffed6",
              backgroundColor: "rgba(33,33,33,0.8)",
              borderRadius: 5,
            },
          }}
          InputLabelProps={{
            sx: {
              fontSize: isLarge ? "1.2rem" : "1.1rem",
              color: theme.palette?.highlight?.main || theme.highlight_color || "#fffed6",
              "&.Mui-focused": {
                color: theme.palette?.highlight?.main || theme.highlight_color || "#fffed6",
              },
              "&.MuiInputLabel-shrink": {
                color: theme.palette?.highlight?.main || theme.highlight_color || "#fffed6",
              },
            },
            required: false,
            shrink: undefined,
          }}
          FormHelperTextProps={{
            required: false,
          }}
          inputProps={{ "aria-required": false }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          color="primary"
          sx={{
            mt: 2,
            py: isLarge ? 2.5 : 2,
            fontSize: isLarge ? "1.4rem" : "1.1rem",
            fontWeight: 700,
            letterSpacing: 1,
            borderRadius: 2,
            boxShadow: "0 4px 24pxrgba(255, 232, 114, 0.83)",
            transition: "background 0.2s",
            backgroundColor: "#FFD600",
            color: "#212121",
            ":hover": {
              backgroundColor: "#b9ac0a",
              color: "#000",
            },
          }}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
