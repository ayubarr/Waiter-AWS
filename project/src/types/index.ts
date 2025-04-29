export interface Table {
  id: number;
  number: number;
  seats: number;
  status: 'available' | 'occupied' | 'reserved';
  order?: Order;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  preparationTime?: number;
  allergens?: string[];
  available: boolean;
}

export interface OrderItem {
  id: number;
  menuItem: MenuItem;
  quantity: number;
  specialRequests?: string;
  status: 'new' | 'preparing' | 'ready' | 'delivered';
}

export interface Order {
  id: number;
  tableId: number;
  items: OrderItem[];
  status: 'active' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  confirmedAt?: Date;
  completedAt?: Date;
  bill?: Bill;
}

export interface Bill {
  id: number;
  orderId: number;
  subtotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
  paymentMethod?: 'cash' | 'card' | 'other';
  confirmedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'waiter';
  avatarUrl?: string;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  language: 'ru';
}

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: string;
  position?: TooltipPosition;
  children: React.ReactNode;
}