import React from 'react';
import { useAppContext } from '../../context/AppContext';
import OrderItem from './OrderItem';
import { ArrowLeft, CreditCard, Receipt, Trash2, X } from 'lucide-react';
import Tooltip from '../common/Tooltip';



const OrderPanel: React.FC = () => {
  const { 
    activeTable, 
    currentOrder, 
    completeOrder, 
    cancelOrder,
    setActiveTable,
    updateTableStatus
  } = useAppContext();

  if (!activeTable || !currentOrder) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Выберите стол, чтобы создать или просмотреть заказ
        </p>
      </div>
    );
  }

  const calculateTotal = () => {
    return currentOrder.items.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity, 
      0
    );
  };

  const handlePayment = (method: 'cash' | 'card' | 'other') => {
    completeOrder(method);
  };

  const handleCancelOrder = () => {
    cancelOrder();
    updateTableStatus(activeTable.id, 'available');
    setActiveTable(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col h-full">
      <div className="p-4 border-b bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <Tooltip content="Вернуться к выбору стола">
            <button 
              className="mr-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setActiveTable(null)}
            >
              <ArrowLeft size={20} />
            </button>
          </Tooltip>
          <h3 className="text-lg font-semibold dark:text-white">Стол {activeTable.number} - Заказ #{currentOrder.id}</h3>
        </div>
        <Tooltip content="Отменить заказ">
          <button 
            className="text-red-500 hover:text-red-700 p-1"
            onClick={handleCancelOrder}
          >
            <X size={20} />
          </button>
        </Tooltip>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {currentOrder.items.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Заказ пуст. Добавьте позиции из меню.
          </p>
        ) : (
          <div className="space-y-4">
            {currentOrder.items.map(item => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <div className="border-t p-4 bg-gray-50 dark:bg-gray-700">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium dark:text-white">Сумма:</span>
          <span className="font-bold dark:text-white">${calculateTotal().toFixed(2)}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button 
            className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            onClick={() => handlePayment('cash')}
            disabled={currentOrder.items.length === 0}
          >
            <Receipt size={20} className="mr-2" />
            Наличные
          </button>
          <button 
            className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            onClick={() => handlePayment('card')}
            disabled={currentOrder.items.length === 0}
          >
            <CreditCard size={20} className="mr-2" />
            Карта
          </button>
        </div>
        
        <button 
          className="mt-4 w-full py-3 px-6 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
          onClick={handleCancelOrder}
          disabled={currentOrder.items.length === 0}
        >
          <Trash2 size={20} className="mr-2" />
          Отменить заказ
        </button>
      </div>
    </div>
  );
};

export default OrderPanel;