import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../redux/authSlice";
import { login as apiLogin } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Box, useMediaQuery } from "@mui/material";
import config from "../../../config/appConfig";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTabletOrLarger = useMediaQuery("(min-width:600px)");
  const theme = config.theme;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiLogin(username, password);
      const { access, refresh } = response.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      const decoded: any = jwtDecode(access);
      const role = decoded.role;
      dispatch(setAuthenticated(true));

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "waiter") {
        navigate("/tables");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert("Usuario o contraseña inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: isTabletOrLarger ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111",
        backgroundImage: theme.background_image
          ? `url(${theme.background_image})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 2,
      }}
    >
      <LoginForm
        username={username}
        password={password}
        loading={loading}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
        loginMessage={config.login_message}
        logo={config.theme.logo}
        theme={theme}
        restaurantName={config.restaurant_name}
      />
    </Box>
  );
};

export default LoginPage;
