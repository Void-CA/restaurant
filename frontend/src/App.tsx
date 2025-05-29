import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  setAuthenticated,
  setLoggedOut,
} from "./features/auth/redux/authSlice";
import Layout from "./layouts/Layout";
import LoginPage from "./features/auth/pages/LoginPage";
import TablesPage from "./features/tables/pages/TablesPage";
import NewOrderPage from "./features/orders/pages/NewOrderPage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./app/theme"; // Importa el theme separado

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  // 👇 Estado local para saber si ya se verificó la sesión
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access) {
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setLoggedOut());
    }
    setCheckingSession(false);
  }, [dispatch]);

  // 👇 Mientras se verifica sesión, no mostramos nada de rutas
  if (checkingSession) {
    return <div>Cargando sesión...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/tables"
            element={
              localStorage.getItem("access") ? (
                <Layout>
                  <TablesPage />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/orders/new/:id"
            element={isLoggedIn ? <NewOrderPage /> : <Navigate to="/login" />}
          />

          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/tables" : "/login"} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
