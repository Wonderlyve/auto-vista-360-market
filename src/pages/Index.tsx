
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import VehicleCard from '@/components/VehicleCard';
import FeaturedVehicle from '@/components/FeaturedVehicle';
import SearchFilters from '@/components/SearchFilters';
import { Link } from 'react-router-dom';
import { Car, Users, MessageCircle } from 'lucide-react';

// Mock data
const featuredVehicle = {
  id: '1',
  title: 'Mercedes-Benz E 220d AMG Line',
  image: 'https://images.unsplash.com/photo-1554223090-7e482851df45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
  price: 49990,
  year: 2023,
  mileage: 15000,
  location: 'Paris',
  has360: true
};

const recentVehicles = [
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'BMW Série 4 Gran Coupé',
    price: 45500,
    year: 2022,
    mileage: 28000,
    fuelType: 'Diesel',
    location: 'Lyon',
    has360: true,
    sellerType: 'professional' as const
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2664&q=80',
    title: 'Audi A3 Sportback',
    price: 32900,
    year: 2021,
    mileage: 35000,
    fuelType: 'Essence',
    location: 'Marseille',
    has360: false,
    sellerType: 'individual' as const
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2336&q=80',
    title: 'Renault Clio V',
    price: 18990,
    year: 2020,
    mileage: 42000,
    fuelType: 'Essence',
    location: 'Toulouse',
    has360: true,
    sellerType: 'professional' as const
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Tesla Model 3',
    price: 39900,
    year: 2021,
    mileage: 25000,
    fuelType: 'Électrique',
    location: 'Lille',
    has360: false,
    sellerType: 'individual' as const
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc7e9e8eb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80',
    title: 'Peugeot 3008',
    price: 29900,
    year: 2020,
    mileage: 48000,
    fuelType: 'Hybride',
    location: 'Bordeaux',
    has360: true,
    sellerType: 'professional' as const
  }
];

const Index = () => {
  const [filters, setFilters] = useState({});
  
  const handleSearch = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Searching with filters:', newFilters);
    // In a real app, this would fetch filtered results
  };

  return (
    <div className="min-h-screen bg-autovista-light-gray">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <FeaturedVehicle {...featuredVehicle} />
      </section>
      
      {/* Search Section */}
      <section className="container mx-auto px-4 py-6">
        <SearchFilters onSearch={handleSearch} />
      </section>
      
      {/* Recent Vehicles */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-autovista-blue">Véhicules récents</h2>
          <Button asChild variant="outline">
            <Link to="/vehicles">Voir tous</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-autovista-blue">Découvrez AutoVista 360°</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm bg-white">
              <div className="mx-auto bg-autovista-teal/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Car className="h-8 w-8 text-autovista-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visite Virtuelle 360°</h3>
              <p className="text-autovista-dark-gray">Découvrez chaque véhicule en détail avec notre technologie de visite virtuelle 360°. Examinez l'intérieur comme l'extérieur.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm bg-white">
              <div className="mx-auto bg-autovista-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-autovista-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Vendeurs</h3>
              <p className="text-autovista-dark-gray">Achetez auprès de concessionnaires professionnels ou de particuliers. Tous les vendeurs sont vérifiés pour votre sécurité.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm bg-white">
              <div className="mx-auto bg-autovista-teal/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-autovista-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Communication Directe</h3>
              <p className="text-autovista-dark-gray">Échangez directement avec les vendeurs via notre système de messagerie intégré. Posez vos questions et négociez en toute simplicité.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-autovista-blue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Vous avez un véhicule à vendre?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Rejoignez notre marketplace et bénéficiez de notre technologie 360° pour mettre en valeur votre véhicule.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-autovista-blue hover:bg-gray-100">
              <Link to="/sell">Publier une annonce</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              <Link to="/about">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">AutoVista 360°</h3>
              <p className="text-sm">La première plateforme de vente de véhicules avec visite virtuelle 360°.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white">Accueil</Link></li>
                <li><Link to="/vehicles" className="hover:text-white">Véhicules</Link></li>
                <li><Link to="/sell" className="hover:text-white">Vendre</Link></li>
                <li><Link to="/about" className="hover:text-white">À Propos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Assistance</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link to="/help" className="hover:text-white">Aide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="hover:text-white">Politique de confidentialité</Link></li>
                <li><Link to="/terms" className="hover:text-white">Conditions d'utilisation</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} AutoVista 360°. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
