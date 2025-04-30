import React from 'react';
import { Clock, LogOut, UserCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleLogout = () => {
    // Очистка данных авторизации (например, токена)
    localStorage.removeItem('authToken');

    // Перенаправление на страницу входа
    window.location.href = '/login';
  };
  
  return (
    <header className="bg-[#1E3A8A] dark:bg-gray-800 text-white shadow-md py-3 px-4 flex justify-between items-center transition-colors">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold">АРМ Официанта</h1>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Clock size={20} />
          <span>{currentTime}</span>
        </div>
        <div className="flex items-center space-x-2">
          <UserCircle size={20} />
          <span>Александр</span>
        </div>
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors"
        >
          <LogOut size={18} />
          <span>Выход</span>
        </button>
      </div>
    </header>
  );
};

export default Header;