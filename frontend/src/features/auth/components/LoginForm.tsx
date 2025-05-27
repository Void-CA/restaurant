import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import config from "../../../config/appConfig";
import { jwtDecode } from "jwt-decode";
import { login as apiLogin } from "../services/auth";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  username: string;
  password: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  loading = false,
}) => (
  <Box
    component="form"
    onSubmit={onSubmit}
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      width: 320,
      mx: "auto",
      mt: 8,
      p: 4,
      borderRadius: 2,
      boxShadow: 3,
      bgcolor: "background.paper",
    }}
  >
    <Typography variant="h5" align="center" gutterBottom>
      Iniciar Sesión
    </Typography>
    <TextField
      label="Usuario"
      value={username}
      onChange={onUsernameChange}
      autoFocus
      required
    />
    <TextField
      label="Contraseña"
      type="password"
      value={password}
      onChange={onPasswordChange}
      required
    />
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={loading}
      sx={{ mt: 2 }}
    >
      {loading ? "Ingresando..." : "Ingresar"}
    </Button>
  </Box>
);
const LoginPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiLogin(username, password);
      const { access, refresh } = response.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      // Decodifica el token para obtener el rol
      const decoded: any = jwtDecode(access);
      const role = decoded.role; // Asegúrate que tu backend lo incluya

      // Redirige según el rol
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "waiter") {
        navigate("/tables");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert("Error de login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <img
        src={config.theme.logo}
        alt={config.restaurant_name}
        style={{
          width: 120,
          margin: "0 auto",
          display: "block",
        }}
      />
      <h2
        style={{
          textAlign: "center",
          color: config.theme.primary_color,
        }}
      >
        {config.login_message}
      </h2>
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
        loading={loading}
      />
    </Container>
  );
};

export default LoginPage;
