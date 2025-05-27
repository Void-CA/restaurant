import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../redux/authSlice";
import { login as apiLogin } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Container from "@mui/material/Container";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
      const role = decoded.role;

      dispatch(setAuthenticated(true));

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
