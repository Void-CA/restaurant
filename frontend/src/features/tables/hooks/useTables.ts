import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tablesService } from '../services/tablesService';
import { Table } from '../types';

export const useTables = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchTables = async () => {
    try {
      setLoading(true);
      const data = await tablesService.getTables();
      setTables(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las mesas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTableClick = (tableId: number) => {
    navigate(`/orders/new/${tableId}`);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return {
    tables,
    loading,
    error,
    refreshTables: fetchTables,
    handleTableClick
  };
}; 