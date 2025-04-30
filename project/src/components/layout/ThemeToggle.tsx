import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      title={isDark ? 'Сменить тему на яркую' : 'Сменить тему на темную'}
    >
      {isDark ? (
        <Sun size={20} className="text-gray-200" />
      ) : (
        <Moon size={20} className="text-gray-600" />
      )}
    </button>
  );
}

export default ThemeToggle;