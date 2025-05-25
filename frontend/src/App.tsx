import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setAuthenticated, setLoggedOut } from "./redux/authSlice";
import Layout from "../layouts/Layout";
import TablesPage from "./pages/TablesPage";
import NewOrderPage from "./pages/NewOrderPage";
import LoginPage from "./pages/LoginPage";

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
  );
}

export default App;
