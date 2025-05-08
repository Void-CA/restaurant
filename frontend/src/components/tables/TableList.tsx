import React from "react";
import TableCard from "./TableCard";

type Table = {
  id: number;
  table_number: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
};

type Props = {
  tables: Table[];
  onTableClick: (table: Table) => void;
};

const TableList: React.FC<Props> = ({ tables, onTableClick }) => {
  return (
    <div className="row">
      {tables.map((table) => (
        <div key={table.id} className="col-6 col-md-3 mb-4">
          <TableCard table={table} onClick={() => onTableClick(table)} />
        </div>
      ))}
    </div>
  );
};

export default TableList;
