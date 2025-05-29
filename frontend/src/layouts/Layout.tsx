import React from "react";
import Box from "@mui/material/Box";
import config from "../config/appConfig"; // Ajusta la ruta si es necesario

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: config.theme.background,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header o Navbar */}
      <header className="bg-dark text-white p-3">
        <h1 className="m-0">Gestión de Mesas</h1>
      </header>

      {/* Contenido principal */}
      <main className="container my-4" style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer opcional */}
      <footer className="bg-light text-center py-3">
        <small>© 2025 Restaurante App</small>
      </footer>
    </Box>
  );
};

export default Layout;
