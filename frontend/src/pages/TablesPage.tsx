import React, { useEffect, useState } from "react";
import axios from "axios";
import TableList from "../components/TableList";
import ActionModal from "../components/ActionModal"; // importa tu modal
import { Action } from "../types/modals";
import { FaEye } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { getTables, updateTableStatus } from "../api/tables";
import {
  BsDashSquare,
  BsFileRuled,
  BsClipboard2Plus,
  BsCheckCircle,
  BsXCircle,
} from "react-icons/bs";

type Table = {
  id: number;
  table_number: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
};

const TablesPage: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showModal, setShowModal] = useState(false);
  const modalIconSize = 36; // Tamaño del icono del modal
  useEffect(() => {
    getTables()
      .then((res) => {
        setTables(res.data);
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

  const handleTableStatusChange = async (status: string) => {
    if (!selectedTable) return;
    try {
      await updateTableStatus(selectedTable.id, status);
      closeModal();
      const res = await getTables();
      setTables(res.data);
    } catch (error) {
      console.error(`Error actualizando el estado a ${status}:`, error);
    }
  };

  const closeModal = () => {
    setSelectedTable(null);
    setShowModal(false);
  };

  const getModalActions = () => {
    if (!selectedTable) return [];

    const actionsMap: Record<string, Action[]> = {
      available: [
        {
          label: "Crear Cuenta",
          icon: <BsClipboard2Plus size={modalIconSize} />,
          variant: "success",
          onClick: () => {
            closeModal();
            window.location.href = `/create-bill/${selectedTable.id}`;
          },
        },
        {
          label: "Reservar Mesa",
          icon: <BsDashSquare size={modalIconSize} />,
          variant: "",
          className: "btn-reserve",
          onClick: () => handleTableStatusChange("reserved"),
        },
      ],
      occupied: [
        {
          label: "Agregar Orden",
          icon: <IoIosAddCircleOutline size={modalIconSize} />,
          variant: "success",
          onClick: () => {
            closeModal();
            window.location.href = `/`;
          },
        },
        {
          label: "Ver Cuenta",
          icon: <FaEye size={modalIconSize} />,
          variant: "primary",
          onClick: () => {
            closeModal();
            window.location.href = `/`;
          },
        },
        {
          label: "Cerrar Cuenta",
          icon: <BsFileRuled size={modalIconSize} />,
          variant: "danger",
          onClick: () => {
            closeModal();
            window.location.href = `/`;
          },
        },
      ],
      reserved: [
        {
          label: "Confirmar Llegada",
          icon: <BsCheckCircle size={modalIconSize} />,
          variant: "success",
          onClick: () => handleTableStatusChange("occupied"),
        },
        {
          label: "Cancelar Reserva",
          icon: <BsXCircle size={modalIconSize} />,
          variant: "danger",
          onClick: async () => handleTableStatusChange("available"),
        },
      ],
      cleaning: [
        {
          label: "Marcar como Disponible",
          icon: <BsCheckCircle size={modalIconSize} />,
          variant: "success",
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
