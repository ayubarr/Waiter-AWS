import React from 'react';
import TableCard from './TableCard';
import { Table } from '../../types';
import { useAppContext } from '../../context/AppContext';

const TableGrid: React.FC = () => {
  const { tables, setActiveTable, activeTable } = useAppContext();

  const handleTableClick = (table: Table) => {
    setActiveTable(table);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Столы</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            onClick={() => handleTableClick(table)}
            isActive={activeTable?.id === table.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TableGrid;