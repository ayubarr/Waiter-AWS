import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Check, Clock, CreditCard, Receipt } from 'lucide-react';

const BillingView: React.FC = () => {
  const { completedOrders, confirmPayment } = useAppContext();
  const unpaidOrders = completedOrders.filter(
    order => order.status === 'completed' && order.bill && !order.bill.isPaid
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Оплата</h2>
      
      {unpaidOrders.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Нет ожидающих оплаты заказов</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unpaidOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold">Заказ #{order.id}</h3>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  Ожидает оплаты
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-gray-800">
                      {item.menuItem.name} x {item.quantity}
                    </span>
                    <span className="text-gray-600">
                      ${(item.menuItem.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between items-center mb-1">
                  <span>Подытог:</span>
                  <span>${order.bill?.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Налог (10%):</span>
                  <span>${order.bill?.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-3 text-lg font-bold">
                  <span>Итого:</span>
                  <span>${order.bill?.total.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {order.bill?.paymentMethod === 'cash' ? (
                      <Receipt size={16} className="mr-1" />
                    ) : (
                      <CreditCard size={16} className="mr-1" />
                    )}
                    <span>
                      {order.bill?.paymentMethod === 'cash' ? 'Наличные' : 'Карта'}
                    </span>
                  </div>
                </div>
                
                <button
                  className="w-full bg-[#1E3A8A] text-white py-2 rounded-md hover:bg-blue-900 transition-colors flex items-center justify-center"
                  onClick={() => confirmPayment(order.id)}
                >
                  <Check size={18} className="mr-2" />
                  Подтвердить оплату
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BillingView;