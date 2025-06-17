import { useParams } from "react-router-dom";

// ... dentro del componente
const { tableId } = useParams();
// tableId será un string, conviértelo a número si lo necesitas:
const table = Number(tableId);
