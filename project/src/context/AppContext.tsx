import React, { createContext, useContext, useState } from 'react';
import { Bill, MenuItem, Order, OrderItem, Table } from '../types';
import { initialTables, menuItems as initialMenuItems } from '../data/mockData';

interface AppContextProps {
  tables: Table[];
  menuItems: MenuItem[];
  activeTable: Table | null;
  currentOrder: Order | null;
  completedOrders: Order[];
  setActiveTable: (table: Table | null) => void;
  updateTableStatus: (tableId: number, status: Table['status']) => void;
  addItemToOrder: (menuItem: MenuItem, quantity: number, specialRequests?: string) => void;
  removeItemFromOrder: (orderItemId: number) => void;
  updateOrderItemQuantity: (orderItemId: number, quantity: number) => void;
  updateOrderItemStatus: (orderItemId: number, status: OrderItem['status']) => void;
  confirmOrder: (orderId: number) => void;
  completeOrder: (paymentMethod: Bill['paymentMethod']) => void;
  confirmPayment: (orderId: number) => void;
  cancelOrder: () => void;
  updateTable: (table: Table) => void;
  updateMenuItem: (item: MenuItem) => void;
  addTable: () => void;
  addMenuItem: (item: MenuItem) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [activeTable, setActiveTable] = useState<Table | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [nextOrderId, setNextOrderId] = useState(1);
  const [nextOrderItemId, setNextOrderItemId] = useState(1);

  // Create a new order when a table is selected
  const handleTableSelection = (table: Table | null) => {
    setActiveTable(table);
    if (table && !table.order) {
      const newOrder: Order = {
        id: nextOrderId,
        tableId: table.id,
        items: [],
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setNextOrderId(prev => prev + 1);
      setCurrentOrder(newOrder);
      
      // Update table with new order
      setTables(prevTables => 
        prevTables.map(t => 
          t.id === table.id ? { ...t, order: newOrder, status: 'occupied' } : t
        )
      );
    } else if (table && table.order) {
      setCurrentOrder(table.order);
    } else {
      setCurrentOrder(null);
    }
  };

  const updateTableStatus = (tableId: number, status: Table['status']) => {
    setTables(prevTables => 
      prevTables.map(table => 
        table.id === tableId ? { ...table, status } : table
      )
    );
  };

  const addItemToOrder = (menuItem: MenuItem, quantity: number, specialRequests?: string) => {
    if (!currentOrder) return;

    const newOrderItem: OrderItem = {
      id: nextOrderItemId,
      menuItem,
      quantity,
      specialRequests,
      status: 'new',
    };

    setNextOrderItemId(prev => prev + 1);

    const updatedOrder: Order = {
      ...currentOrder,
      items: [...currentOrder.items, newOrderItem],
      updatedAt: new Date(),
    };

    setCurrentOrder(updatedOrder);

    // Update table with the updated order
    setTables(prevTables => 
      prevTables.map(table => 
        table.id === currentOrder.tableId ? { ...table, order: updatedOrder } : table
      )
    );
  };

  const removeItemFromOrder = (orderItemId: number) => {
    if (!currentOrder) return;

    const updatedOrder: Order = {
      ...currentOrder,
      items: currentOrder.items.filter(item => item.id !== orderItemId),
      updatedAt: new Date(),
    };

    setCurrentOrder(updatedOrder);

    // Update table with the updated order
    setTables(prevTables => 
      prevTables.map(table => 
        table.id === currentOrder.tableId ? { ...table, order: updatedOrder } : table
      )
    );
  };

  const updateOrderItemQuantity = (orderItemId: number, quantity: number) => {
    if (!currentOrder) return;

    const updatedOrder: Order = {
      ...currentOrder,
      items: currentOrder.items.map(item => 
        item.id === orderItemId ? { ...item, quantity } : item
      ),
      updatedAt: new Date(),
    };

    setCurrentOrder(updatedOrder);

    // Update table with the updated order
    setTables(prevTables => 
      prevTables.map(table => 
        table.id === currentOrder.tableId ? { ...table, order: updatedOrder } : table
      )
    );
  };

  const updateOrderItemStatus = (orderItemId: number, status: OrderItem['status']) => {
    if (!currentOrder) return;

    const updatedOrder: Order = {
      ...currentOrder,
      items: currentOrder.items.map(item => 
        item.id === orderItemId ? { ...item, status } : item
      ),
      updatedAt: new Date(),
    };

    setCurrentOrder(updatedOrder);

    // Update table with the updated order
    setTables(prevTables => 
      prevTables.map(table => 
        table.id === currentOrder.tableId ? { ...table, order: updatedOrder } : table
      )
    );
  };

  const confirmOrder = (orderId: number) => {
    const orderToConfirm = completedOrders.find(order => order.id === orderId) || currentOrder;
    if (!orderToConfirm) return;

    const confirmedOrder: Order = {
      ...orderToConfirm,
      status: 'confirmed',
      confirmedAt: new Date(),
      updatedAt: new Date(),
    };

    if (orderToConfirm === currentOrder) {
      setCurrentOrder(confirmedOrder);
      setTables(prevTables => 
        prevTables.map(table => 
          table.id === orderToConfirm.tableId ? { ...table, order: confirmedOrder } : table
        )
      );
    } else {
      setCompletedOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? confirmedOrder : order
        )
      );
    }
  };

  const completeOrder = (paymentMethod: Bill['paymentMethod']) => {
    if (!currentOrder || !activeTable) return;

    const subtotal = currentOrder.items.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity, 
      0
    );
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    const bill: Bill = {
      id: currentOrder.id,
      orderId: currentOrder.id,
      subtotal,
      tax,
      total,
      isPaid: false,
      paymentMethod,
    };

    const completedOrder: Order = {
      ...currentOrder,
      status: 'completed',
      completedAt: new Date(),
      updatedAt: new Date(),
      bill,
    };

    // Add to completed orders
    setCompletedOrders(prev => [...prev, completedOrder]);

    // Reset the table
    setTables(prevTables => 
      prevTables.map(table => 
        table.id === activeTable.id ? { ...table, order: undefined, status: 'available' } : table
      )
    );

    // Reset active table and current order
    setActiveTable(null);
    setCurrentOrder(null);
  };

  const confirmPayment = (orderId: number) => {
    setCompletedOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId && order.bill) {
          return {
            ...order,
            bill: {
              ...order.bill,
              isPaid: true,
              confirmedAt: new Date(),
            },
          };
        }
        return order;
      })
    );
  };

  const cancelOrder = () => {
    if (!currentOrder || !activeTable) return;

    const cancelledOrder: Order = {
      ...currentOrder,
      status: 'cancelled',
      updatedAt: new Date(),
    };

    setCompletedOrders(prev => [...prev, cancelledOrder]);

    // Reset the table
    setTables(prevTables => 
      prevTables.map(table => 
        table.id === activeTable.id ? { ...table, order: undefined, status: 'available' } : table
      )
    );

    // Reset active table and current order
    setActiveTable(null);
    setCurrentOrder(null);
  };

  // Add the missing functions for table and menu item management
  const updateTable = (table: Table) => {
    setTables(prevTables =>
      prevTables.map(t => t.id === table.id ? table : t)
    );
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems(prevItems =>
      prevItems.map(i => i.id === item.id ? item : i)
    );
  };

  const addTable = () => {
    const newTable: Table = {
      id: tables.length + 1,
      number: tables.length + 1,
      seats: 4,
      status: 'available',
    };
    setTables(prev => [...prev, newTable]);
  };

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [...prev, item]);
  };

  return (
    <AppContext.Provider
      value={{
        tables,
        menuItems,
        activeTable,
        currentOrder,
        completedOrders,
        setActiveTable: handleTableSelection,
        updateTableStatus,
        addItemToOrder,
        removeItemFromOrder,
        updateOrderItemQuantity,
        updateOrderItemStatus,
        confirmOrder,
        completeOrder,
        confirmPayment,
        cancelOrder,
        updateTable,
        updateMenuItem,
        addTable,
        addMenuItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};