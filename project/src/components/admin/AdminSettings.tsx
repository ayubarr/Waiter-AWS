import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { MenuItem, Table } from '../../types';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import Tooltip from '../common/Tooltip';

const AdminSettings: React.FC = () => {
  const { tables, menuItems, updateTable, updateMenuItem, addTable, addMenuItem } = useAppContext();
  const [activeTab, setActiveTab] = useState<'tables' | 'menu'>('tables');

  const handleTableUpdate = (table: Table) => {
    updateTable(table);
  };

  const handleMenuItemUpdate = (item: MenuItem) => {
    updateMenuItem(item);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Настройки</h2>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === 'tables'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
          onClick={() => setActiveTab('tables')}
        >
          Столы
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === 'menu'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
          onClick={() => setActiveTab('menu')}
        >
          Меню
        </button>
      </div>

      {activeTab === 'tables' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Управление столами</h3>
            <Tooltip content="Добавить новый стол" position="left">
              <button
                onClick={() => addTable()}
                className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Plus size={20} />
              </button>
            </Tooltip>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tables.map((table) => (
              <div
                key={table.id}
                className="p-4 border rounded-md dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Стол #{table.number}
                  </span>
                  <div className="flex space-x-2">
                    <Tooltip content="Редактировать стол" position="top">
                      <button
                        onClick={() => handleTableUpdate(table)}
                        className="p-1 text-blue-600 hover:text-blue-700"
                      >
                        <Edit2 size={16} />
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Мест: {table.seats}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Статус: {table.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'menu' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Управление меню</h3>
            <Tooltip content="Добавить новое блюдо" position="left">
              <button
                onClick={() => addMenuItem()}
                className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Plus size={20} />
              </button>
            </Tooltip>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-md dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </span>
                  <div className="flex space-x-2">
                    <Tooltip content="Редактировать блюдо" position="top">
                      <button
                        onClick={() => handleMenuItemUpdate(item)}
                        className="p-1 text-blue-600 hover:text-blue-700"
                      >
                        <Edit2 size={16} />
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Цена: {item.price} ₽
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Категория: {item.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;