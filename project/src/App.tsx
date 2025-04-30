import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import TableGrid from './components/tables/TableGrid';
import MenuGrid from './components/menu/MenuGrid';
import OrderPanel from './components/orders/OrderPanel';
import OrdersView from './components/orders/OrdersView';
import BillingView from './components/billing/BillingView';
import UserProfile from './components/user/UserProfile';
import AdminSettings from './components/admin/AdminSettings';
import LoginForm from './components/auth/LoginForm';
import { useAuth } from './context/AuthContext';
import FaqGuide from './components/help/FaqGuide';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('tables');
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView}
          isAdmin={user.role === 'admin'}
          onHelpClick={() => setIsHelpOpen(!isHelpOpen)} // Передаём обработчик
        />
        <main className="flex-1 flex bg-gray-100 dark:bg-gray-800 overflow-hidden transition-colors">
          <div className={`flex-1 overflow-auto transition-all ${activeView === 'tables' ? 'w-2/3' : 'w-full'}`}>
            {activeView === 'tables' && <TableGrid />}
            {activeView === 'menu' && <MenuGrid />}
            {activeView === 'orders' && <OrdersView />}
            {activeView === 'billing' && <BillingView />}
            {activeView === 'profile' && <UserProfile />}
            {activeView === 'settings' && user.role === 'admin' && <AdminSettings />}
            {activeView === 'help' && <FaqGuide />}

          </div>
          {activeView === 'tables' && (
            <div className="w-1/3 p-4 overflow-auto">
              <OrderPanel />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;