import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import TablesPage from "./pages/TablesPage";
import NewOrderPage from "./pages/NewOrderPage"; // creala más adelante si aún no existe
import "./App.css"; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<TablesPage />} />
          <Route path="/create-bill/:id" element={<NewOrderPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
