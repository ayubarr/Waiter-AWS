import React from 'react';
import { OrderItem as OrderItemType } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface OrderItemProps {
  item: OrderItemType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  const { 
    updateOrderItemQuantity, 
    removeItemFromOrder,
    updateOrderItemStatus
  } = useAppContext();

  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateOrderItemQuantity(item.id, newQuantity);
    } else {
      removeItemFromOrder(item.id);
    }
  };

  const getStatusBadge = () => {
    switch (item.status) {
      case 'new':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Новый</span>;
      case 'preparing':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Готовится</span>;
      case 'ready':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Готов</span>;
      case 'delivered':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Подан</span>;
      default:
        return null;
    }
  };

  // For this demo, we'll simulate status changes manually
  const handleStatusChange = () => {
    const statusFlow: OrderItemType['status'][] = ['new', 'preparing', 'ready', 'delivered'];
    const currentIndex = statusFlow.indexOf(item.status);
    const nextStatus = statusFlow[(currentIndex + 1) % statusFlow.length];
    updateOrderItemStatus(item.id, nextStatus);
  };

  return (
    <div className="border rounded-lg p-3 bg-white hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{item.menuItem.name}</h4>
          <div className="text-sm text-gray-600 mt-1">${item.menuItem.price.toFixed(2)} x {item.quantity}</div>
          {item.specialRequests && (
            <p className="text-xs text-gray-500 mt-1 italic">
              "{item.specialRequests}"
            </p>
          )}
        </div>
        <div className="text-right">
          <div className="font-semibold">${(item.menuItem.price * item.quantity).toFixed(2)}</div>
          <button 
            className="mt-1 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            onClick={handleStatusChange}
          >
            {getStatusBadge()}
          </button>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
            onClick={() => handleQuantityChange(-1)}
          >
            <Minus size={16} />
          </button>
          <span className="mx-2 font-medium">{item.quantity}</span>
          <button 
            className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
            onClick={() => handleQuantityChange(1)}
          >
            <Plus size={16} />
          </button>
        </div>
        <button 
          className="text-red-500 hover:text-red-700"
          onClick={() => removeItemFromOrder(item.id)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default OrderItem;