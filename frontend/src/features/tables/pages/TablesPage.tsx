import React, { useEffect, useState } from "react";
import TableList from "../components/TableList";
import ActionModal from "../components/ActionModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Action } from "../types/modals";
import { FaEye } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { tablesService } from "../services/tablesService";
import {
  BsDashSquare,
  BsFileRuled,
  BsClipboard2Plus,
  BsCheckCircle,
  BsXCircle,
} from "react-icons/bs";

import type { Table } from "../types/tables";

const TablesPage: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showModal, setShowModal] = useState(false);
  const modalIconSize = 36; // Tamaño del icono del modal
  useEffect(() => {
    tablesService
      .getTables()
      .then((tables) => {
        setTables(tables);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tables:", err);
        setLoading(false);
      });
  }, []);

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    setShowModal(true);
  };

  const handleTableStatusChange = async (
    status: "available" | "occupied" | "reserved" | "cleaning"
  ) => {
    if (!selectedTable) return;
    try {
      await tablesService.updateTableStatus(selectedTable.id, status);
      closeModal();
      const tables = await tablesService.getTables();
      setTables(tables);
    } catch (error) {
      console.error(`Error actualizando el estado a ${status}:`, error);
    }
  };

  const closeModal = () => {
    setSelectedTable(null);
    setShowModal(false);
  };

  const navigate = useNavigate();
  const getModalActions = () => {
    if (!selectedTable) return [];

    const actionsMap: Record<string, Action[]> = {
      available: [
        {
          label: "Crear Cuenta",
          icon: <BsClipboard2Plus size={modalIconSize} />,
          variant: "contained",
          color: "success",
          onClick: async () => {
            try {
              await tablesService.updateTableStatus(
                selectedTable.id,
                "occupied"
              );
              toast.success(
                `Cuenta creada para la mesa #${selectedTable.table_number}`
              );
              closeModal();
              navigate(`/orders/new/${selectedTable.id}`);
            } catch (error) {
              toast.error("Error al crear la cuenta");
              console.error(error);
            }
          },
        },
        {
          label: "Reservar Mesa",
          icon: <BsDashSquare size={modalIconSize} />,
          variant: "contained",
          color: "warning",
          onClick: () => handleTableStatusChange("reserved"),
        },
      ],
      occupied: [
        {
          label: "Agregar Orden",
          icon: <IoIosAddCircleOutline size={modalIconSize} />,
          variant: "contained",
          color: "success",
          onClick: () => {
            closeModal();
            window.location.href = `/`;
          },
        },
        {
          label: "Ver Cuenta",
          icon: <FaEye size={modalIconSize} />,
          variant: "contained",
          color: "primary",
          onClick: () => {
            closeModal();
            window.location.href = `/`;
          },
        },
        {
          label: "Cerrar Cuenta",
          icon: <BsFileRuled size={modalIconSize} />,
          variant: "contained",
          color: "error",
          onClick: () => handleTableStatusChange("available"),
        },
      ],
      reserved: [
        {
          label: "Confirmar Llegada",
          icon: <BsCheckCircle size={modalIconSize} />,
          variant: "contained",
          color: "success",
          onClick: () => handleTableStatusChange("occupied"),
        },
        {
          label: "Cancelar Reserva",
          icon: <BsXCircle size={modalIconSize} />,
          variant: "contained",
          color: "error",
          onClick: async () => handleTableStatusChange("available"),
        },
      ],
      cleaning: [
        {
          label: "Marcar como Disponible",
          icon: <BsCheckCircle size={modalIconSize} />,
          variant: "contained",
          color: "success",
          onClick: () => handleTableStatusChange("available"),
        },
      ],
    };

    return actionsMap[selectedTable.status] || [];
  };

  if (loading) return <p>Cargando mesas...</p>;

  return (
    <>
      <TableList tables={tables} onTableClick={handleTableClick} />
      <ActionModal
        show={showModal}
        title={selectedTable ? `Mesa #${selectedTable.table_number}` : ""}
        message="¿Qué deseas hacer con esta mesa?"
        onClose={closeModal}
        actions={getModalActions()}
      />
    </>
  );
};

export default TablesPage;
