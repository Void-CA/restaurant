import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Importamos el tipo RootState

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Usamos useSelector para obtener el estado de autenticación desde Redux
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    // Si no está autenticado, redirigimos al login
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderizamos los hijos (las rutas protegidas)
  return <>{children}</>;
};

export default ProtectedRoute;
