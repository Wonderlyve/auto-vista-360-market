
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
      path: '/chat/1', // ou une page de messages générique
    },
    {
      icon: User,
      label: 'Profil',
      path: '/profile',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-autovista-teal bg-autovista-teal/10' 
                  : 'text-gray-500 hover:text-autovista-teal'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNavbar;
