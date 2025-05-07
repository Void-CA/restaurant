import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Header o Navbar */}
      <header className="bg-dark text-white p-3">
        <h1 className="m-0">Gestión de Mesas</h1>
      </header>

      {/* Contenido principal */}
      <main className="container my-4">{children}</main>

      {/* Footer opcional */}
      <footer className="bg-light text-center py-3">
        <small>© 2025 Restaurante App</small>
      </footer>
    </div>
  );
};

export default Layout;
