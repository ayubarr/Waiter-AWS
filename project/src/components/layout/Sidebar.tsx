import React, { useState } from 'react';
import { LayoutGrid, Utensils, Clock, Receipt, Settings } from 'lucide-react';

type NavItem = {
  name: string;
  icon: React.ReactNode;
  view: string;
  onClick?: () => void;
};

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isAdmin: boolean;
  onHelpClick: () => void; // Добавляем обработчик для кнопки "Справка"
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isAdmin, onHelpClick }) => {
  const navItems: NavItem[] = [
    { name: 'Столы', icon: <LayoutGrid size={24} />, view: 'tables' },
    { name: 'Меню', icon: <Utensils size={24} />, view: 'menu' },
    { name: 'Заказы', icon: <Clock size={24} />, view: 'orders' },
    { name: 'Оплата', icon: <Receipt size={24} />, view: 'billing' },
    { name: 'Настройки', icon: <Settings size={24} />, view: 'settings' },
    { name: 'FAQ', icon: <Settings size={24} />, view: 'help' },
  ];

  return (
    <aside className="bg-gray-800 text-white h-screen w-20 flex flex-col items-center pt-5">
      {navItems.map((item) => (
        <button 
          key={item.view}
          className={`w-full py-4 flex flex-col items-center justify-center space-y-1 hover:bg-gray-700 transition-colors ${
            activeView === item.view ? 'bg-gray-700 border-l-4 border-[#F59E0B]' : ''
          }`}
          onClick={() => item.onClick ? item.onClick() : setActiveView(item.view)}
        >
          {item.icon}
          <span className="text-xs">{item.name}</span>
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;