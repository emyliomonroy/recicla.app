
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: 'fa-house', label: 'Inicio' },
    { path: '/mapa', icon: 'fa-map-location-dot', label: 'Mapa' },
    { path: '/reciclar', icon: 'fa-plus-circle', label: 'Reciclar', special: true },
    { path: '/tienda', icon: 'fa-store', label: 'Tienda' },
    { path: '/perfil', icon: 'fa-user', label: 'Perfil' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 z-40 glass-effect border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">
            <i className="fas fa-leaf"></i>
          </div>
          <span className="font-bold text-xl text-green-800 tracking-tight">EcoPuntos</span>
        </div>
        <button className="relative p-2 text-gray-600">
          <i className="fas fa-bell text-xl"></i>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </header>

      <main className="flex-grow container mx-auto max-w-lg px-4 pt-4">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-gray-200 px-2 py-3">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            if (item.special) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative -top-6 bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-green-200 border-4 border-white transform transition-transform active:scale-90"
                >
                  <i className={`fas ${item.icon} text-2xl`}></i>
                </Link>
              );
            }
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <i className={`fas ${item.icon} text-lg`}></i>
                <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
