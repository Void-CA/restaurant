export interface Table {
  id: number;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  current_order?: number;
}

export interface TablesState {
  tables: Table[];
  loading: boolean;
  error: string | null;
} 