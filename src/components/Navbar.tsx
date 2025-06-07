
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, User, Car } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-autovista-teal" />
            <span className="text-2xl font-bold text-autovista-blue">AutoVista</span>
            <span className="hidden md:inline-block text-sm bg-autovista-teal text-white px-2 py-1 rounded">360°</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-autovista-dark-gray hover:text-autovista-teal transition-colors">Accueil</Link>
            <Link to="/vehicules" className="text-autovista-dark-gray hover:text-autovista-teal transition-colors">Véhicules</Link>
            <Link to="/view-all" className="text-autovista-dark-gray hover:text-autovista-teal transition-colors">Voir tout</Link>
            <Link to="/vendre" className="text-autovista-dark-gray hover:text-autovista-teal transition-colors">Vendre</Link>
            <Link to="/about" className="text-autovista-dark-gray hover:text-autovista-teal transition-colors">À Propos</Link>
          </div>
          
          {/* Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/seller-dashboard">
              <Button variant="outline" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Espace Vendeur
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-autovista-teal hover:bg-autovista-blue">Connexion</Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 space-y-3 animate-fade-in">
            <Link to="/" className="block py-2 text-autovista-dark-gray hover:text-autovista-teal">Accueil</Link>
            <Link to="/vehicules" className="block py-2 text-autovista-dark-gray hover:text-autovista-teal">Véhicules</Link>
            <Link to="/view-all" className="block py-2 text-autovista-dark-gray hover:text-autovista-teal">Voir tout</Link>
            <Link to="/vendre" className="block py-2 text-autovista-dark-gray hover:text-autovista-teal">Vendre</Link>
            <Link to="/about" className="block py-2 text-autovista-dark-gray hover:text-autovista-teal">À Propos</Link>
            <div className="flex space-x-2">
              <Link to="/seller-dashboard" className="flex-1">
                <Button variant="outline" className="w-full">Espace Vendeur</Button>
              </Link>
              <Link to="/login" className="flex-1">
                <Button className="w-full bg-autovista-teal hover:bg-autovista-blue">Connexion</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
