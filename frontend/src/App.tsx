import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "../layouts/Layout";
import TablesPage from "./pages/TablesPage";
import NewOrderPage from "./pages/NewOrderPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Ruta con layout */}
        <Route
          path="/"
          element={
            <Layout>
              <TablesPage />
            </Layout>
          }
        />

        {/* Ruta sin layout */}
        <Route path="/orders/new/:id" element={<NewOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
