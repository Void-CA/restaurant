import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../redux/authSlice";
import { login as apiLogin } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Intentando login...");

    try {
      const response = await apiLogin(username, password);
      console.log("Respuesta de login:", response);

      const { access, refresh } = response.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      dispatch(setAuthenticated(true)); // Solo marca autenticado
      navigate("/tables");
    } catch (error) {
      console.error("Error de login", error);
      alert("Error de login: " + JSON.stringify(error));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
