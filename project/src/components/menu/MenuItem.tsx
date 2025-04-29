import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { Clock, Plus, Minus, AlertCircle } from 'lucide-react';
import Tooltip from '../common/Tooltip';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addItemToOrder, activeTable } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddToOrder = () => {
    if (!activeTable) {
      alert('Пожалуйста, сначала выберите стол');
      return; 
    }
    
    addItemToOrder(item, quantity, specialRequests);
    setQuantity(1);
    setSpecialRequests('');
    setShowAddForm(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {item.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold dark:text-white">{item.name}</h3>
          <span className="font-bold text-blue-600 dark:text-blue-400">${item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">{item.description}</p>
        
        <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
          {item.preparationTime && (
            <div className="flex items-center mr-3">
              <Clock size={14} className="mr-1" />
              <span>{item.preparationTime} мин</span>
            </div>
          )}
          
          {item.allergens && item.allergens.length > 0 && (
            <div className="flex items-center">
              <AlertCircle size={14} className="mr-1" />
              <span>{item.allergens.join(', ')}</span>
            </div>
          )}
        </div>
        
        {!showAddForm ? (
          <Tooltip content={`Добавить "${item.name}" в заказ${activeTable ? ` для стола ${activeTable.number}` : ''}`}>
            <button 
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              onClick={() => setShowAddForm(true)}
              disabled={!item.available}
            >
              <Plus size={18} className="mr-1" />
              Добавить
            </button>
          </Tooltip>
        ) : (
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium dark:text-white">Количество:</span>
              <div className="flex items-center">
                <button 
                  className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="mx-3 font-medium dark:text-white">{quantity}</span>
                <button 
                  className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <Tooltip content="Необязательное поле. Укажите особые пожелания к приготовлению блюда">
              <div>
                <textarea
                  placeholder="Особые пожелания..."
                  className="w-full p-2 border rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={2}
                />
              </div>
            </Tooltip>
            
            <div className="flex space-x-2">
              <button 
                className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setShowAddForm(false)}
              >
                Отмена
              </button>
              <Tooltip content={`Добавить ${quantity}x "${item.name}" в заказ${activeTable ? ` для стола ${activeTable.number}` : ''}`}>
                <button 
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={handleAddToOrder}
                >
                  В заказ
                </button>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;