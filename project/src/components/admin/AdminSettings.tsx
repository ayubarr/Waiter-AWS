import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { MenuItem, Table } from '../../types';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import Tooltip from '../common/Tooltip';

const AdminSettings: React.FC = () => {
  const { tables, menuItems, updateTable, updateMenuItem, addTable, addMenuItem } = useAppContext();
  const [activeTab, setActiveTab] = useState<'tables' | 'menu'>('tables');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [isTableFormVisible, setIsTableFormVisible] = useState(false);

  const handleTableUpdate = (table: Table) => {
    updateTable(table);
  };

  const handleTableEdit = (table: Table) => {
    setEditingTable(table); // Устанавливаем редактируемый стол
    setIsTableFormVisible(true); // Показываем форму
  };

  const handleTableFormSubmit = (table: Table) => {
    updateTable(table); // Обновляем стол
    setIsTableFormVisible(false); // Скрываем форму
  };

  const handleMenuItemUpdate = (item: MenuItem) => {
    setEditingMenuItem(item);
    setIsFormVisible(true);
  };

  const handleFormSubmit = (item: MenuItem) => {
    if (editingMenuItem) {
      updateMenuItem(item); // Обновляем существующее блюдо
    } else {
      const newMenuItem = {
        ...item,
        id: Date.now(), // Генерируем уникальный ID
        available: true, // Устанавливаем значение по умолчанию
      };
      addMenuItem(newMenuItem); // Передаем объект newMenuItem в addMenuItem
      console.log('New menu item:', newMenuItem); // Логируем для проверки
    }

    // Скрываем форму после сохранения
    setIsFormVisible(false);
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
                onClick={addTable}
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
                        onClick={() => handleTableEdit(table)}
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

          {isTableFormVisible && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const updatedTable: Table = {
                  id: editingTable?.id || Date.now(),
                  number: parseInt(formData.get('number') as string, 10),
                  seats: parseInt(formData.get('seats') as string, 10),
                  status: formData.get('status') as Table['status'],
                };
                handleTableFormSubmit(updatedTable);
              }}
            >
              <div className="grid grid-cols-1 gap-4">
                <input
                  name="number"
                  type="number"
                  defaultValue={editingTable?.number || ''}
                  placeholder="Номер стола"
                  className="p-2 border rounded-md"
                  required
                />
                <input
                  name="seats"
                  type="number"
                  defaultValue={editingTable?.seats || ''}
                  placeholder="Количество мест"
                  className="p-2 border rounded-md"
                  required
                />
                <select
                  name="status"
                  defaultValue={editingTable?.status || 'available'}
                  className="p-2 border rounded-md"
                  required
                >
                  <option value="available">Доступен</option>
                  <option value="occupied">Занят</option>
                  <option value="reserved">Зарезервирован</option>
                </select>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsTableFormVisible(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md mr-2"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Сохранить
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {activeTab === 'menu' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Управление меню</h3>
            <Tooltip content="Добавить новое блюдо" position="left">
              <button
                onClick={() => {
                  setEditingMenuItem(null);
                  setIsFormVisible(true);
                }}
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

          {isFormVisible && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const newItem: MenuItem = {
                  id: editingMenuItem?.id || Date.now(),
                  name: formData.get('name') as string,
                  description: formData.get('description') as string,
                  price: parseFloat(formData.get('price') as string),
                  category: formData.get('category') as string,
                  imageUrl: formData.get('imageUrl') as string,
                  preparationTime: parseInt(formData.get('preparationTime') as string, 10),
                  allergens: (formData.get('allergens') as string).split(','),
                  available: true, // Устанавливаем значение по умолчанию
                };
                handleFormSubmit(newItem);
              }}
            >
              <div className="grid grid-cols-1 gap-4">
                <input
                  name="name"
                  defaultValue={editingMenuItem?.name || ''}
                  placeholder="Название блюда"
                  className="p-2 border rounded-md"
                  required
                />
                <textarea
                  name="description"
                  defaultValue={editingMenuItem?.description || ''}
                  placeholder="Описание"
                  className="p-2 border rounded-md"
                  required
                />
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={editingMenuItem?.price || ''}
                  placeholder="Цена"
                  className="p-2 border rounded-md"
                  required
                />
                <input
                  name="category"
                  defaultValue={editingMenuItem?.category || ''}
                  placeholder="Категория"
                  className="p-2 border rounded-md"
                  required
                />
                <input
                  name="imageUrl"
                  defaultValue={editingMenuItem?.imageUrl || ''}
                  placeholder="Ссылка на изображение"
                  className="p-2 border rounded-md"
                />
                <input
                  name="preparationTime"
                  type="number"
                  defaultValue={editingMenuItem?.preparationTime || ''}
                  placeholder="Время приготовления (мин)"
                  className="p-2 border rounded-md"
                  required
                />
                <input
                  name="allergens"
                  defaultValue={editingMenuItem?.allergens?.join(', ') || ''}
                  placeholder="Аллергены (через запятую)"
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md mr-2"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Сохранить
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminSettings;