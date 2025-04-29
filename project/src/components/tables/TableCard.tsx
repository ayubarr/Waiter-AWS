import React from 'react';
import { Table } from '../../types';
import { Users } from 'lucide-react';
import Tooltip from '../common/Tooltip';

interface TableCardProps {
  table: Table;
  onClick: () => void;
  isActive: boolean;
}

const TableCard: React.FC<TableCardProps> = ({ table, onClick, isActive }) => {
  const getBgColor = () => {
    if (isActive) return 'bg-blue-100 border-blue-500';
    
    switch (table.status) {
      case 'available':
        return 'bg-green-100 border-green-500';
      case 'occupied':
        return 'bg-red-100 border-red-500';
      case 'reserved':
        return 'bg-yellow-100 border-yellow-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  const getStatusText = () => {
    switch (table.status) {
      case 'available':
        return 'Свободен';
      case 'occupied':
        return 'Занят';
      case 'reserved':
        return 'Резерв';
      default:
        return 'Неизвестно';
    }
  };

  const tooltipContent = `Стол ${table.number} - ${table.seats} мест\nСтатус: ${getStatusText()}${
    table.order ? `\nАктивный заказ: #${table.order.id}` : ''
  }`;

  return (
    <Tooltip content={tooltipContent} position="top">
      <div 
        className={`cursor-pointer rounded-lg shadow-md p-4 border-l-4 transition-all transform hover:scale-105 ${getBgColor()}`}
        onClick={onClick}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Стол {table.number}</h3>
          <span className={`px-2 py-1 rounded-full text-xs ${
            table.status === 'available' ? 'bg-green-200 text-green-800' :
            table.status === 'occupied' ? 'bg-red-200 text-red-800' :
            'bg-yellow-200 text-yellow-800'
          }`}>
            {getStatusText()}
          </span>
        </div>
        <div className="flex items-center mt-2 text-gray-600">
          <Users size={18} className="mr-2" />
          <span>{table.seats} мест</span>
        </div>
        {table.order && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-sm font-medium">Заказ: #{table.order.id}</p>
            <p className="text-xs text-gray-500">
              {table.order.items.length} позиций
            </p>
          </div>
        )}
      </div>
    </Tooltip>
  );
};

export default TableCard;