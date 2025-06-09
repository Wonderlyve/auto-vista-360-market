
import { Home, Search, Car, User, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MobileBottomNavbar = () => {
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: 'Accueil',
      path: '/',
    },
    {
      icon: Search,
      label: 'Recherche',
      path: '/vehicules',
    },
    {
      icon: Car,
      label: 'Vendre',
      path: '/vendre',
    },
    {
      icon: MessageCircle,
      label: 'Messages',
      path: '/chat/1',
    },
    {
      icon: User,
      label: 'Profil',
      path: '/seller-dashboard',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden safe-area-inset-bottom">
      <div className="flex justify-around items-center py-1 px-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-0 flex-1 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <Icon className="h-4 w-4 mb-1" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNavbar;
