import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "../layouts/Layout";
import TablesPage from "./pages/TablesPage";
import NewOrderPage from "./pages/NewOrderPage";
import LoginPage from "./pages/LoginPage";
import "./App.css";

function App() {
  const isLoggedIn = localStorage.getItem("waiter") !== null;

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Ruta de login sin layout */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/tables"
          element={
            isLoggedIn ? (
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

        {/* Ruta comodín: redirige según estado de login */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
