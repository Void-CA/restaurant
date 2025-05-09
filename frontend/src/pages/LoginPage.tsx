// pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate("/"); // redirigir al inicio
    } catch (error) {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuario"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default LoginPage;
