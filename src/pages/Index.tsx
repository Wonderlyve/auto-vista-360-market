
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import VehicleCard from '@/components/VehicleCard';
import PropertyCard from '@/components/PropertyCard';
import FeaturedVehiclesCarousel from '@/components/FeaturedVehicle';
import SearchFilters from '@/components/SearchFilters';
import MobileBottomNavbar from '@/components/MobileBottomNavbar';
import { Link } from 'react-router-dom';
import { Car, Users, MessageCircle } from 'lucide-react';

// Mock data pour le carousel de véhicules vedettes
const featuredVehicles = [
  {
    id: '1',
    title: 'Mercedes-Benz E 220d AMG Line',
    image: 'https://images.unsplash.com/photo-1554223090-7e482851df45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
    price: 49990,
    year: 2023,
    mileage: 15000,
    location: 'Paris',
    has360: true
  },
  {
    id: '2',
    title: 'BMW Série 4 Gran Coupé',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    price: 45500,
    year: 2022,
    mileage: 28000,
    location: 'Lyon',
    has360: true
  },
  {
    id: '3',
    title: 'Audi A3 Sportback',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2664&q=80',
    price: 32900,
    year: 2021,
    mileage: 35000,
    location: 'Marseille',
    has360: false
  },
  {
    id: '4',
    title: 'Tesla Model 3',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    price: 39900,
    year: 2021,
    mileage: 25000,
    location: 'Lille',
    has360: false
  },
  {
    id: '5',
    title: 'Peugeot 3008',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc7e9e8eb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80',
    price: 29900,
    year: 2020,
    mileage: 48000,
    location: 'Bordeaux',
    has360: true
  }
];

// Données d'exemple pour les propriétés
const featuredProperties = [
  {
    id: '1',
    title: 'Villa moderne avec piscine',
    price: '450,000 $',
    location: 'Kinshasa, Gombe',
    type: 'Villa',
    bedrooms: 4,
    bathrooms: 3,
    surface: 300,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
    features: ['Piscine', 'Garage', 'Jardin', 'Climatisation']
  },
  {
    id: '2',
    title: 'Appartement standing centre-ville',
    price: '180,000 $',
    location: 'Kinshasa, Lingwala',
    type: 'Appartement',
    bedrooms: 3,
    bathrooms: 2,
    surface: 120,
    image: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800&h=600&fit=crop',
    features: ['Balcon', 'Ascenseur', 'Parking']
  },
  {
    id: '3',
    title: 'Maison familiale avec grand terrain',
    price: '220,000 $',
    location: 'Kinshasa, Lemba',
    type: 'Maison',
    bedrooms: 5,
    bathrooms: 3,
    surface: 250,
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
    features: ['Grand terrain', 'Véranda', 'Cuisine équipée']
  }
];

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
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Volkswagen Golf GTI',
    price: 35900,
    year: 2022,
    mileage: 18000,
    fuelType: 'Essence',
    location: 'Strasbourg',
    has360: true,
    sellerType: 'individual' as const
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Porsche 911 Carrera',
    price: 89900,
    year: 2021,
    mileage: 12000,
    fuelType: 'Essence',
    location: 'Nice',
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
    <div className="min-h-screen bg-autovista-light-gray pb-16 md:pb-0 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section with Carousel */}
      <section className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <FeaturedVehiclesCarousel vehicles={featuredVehicles} />
      </section>
      
      {/* Search Section */}
      <section className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <SearchFilters onSearch={handleSearch} />
      </section>
      
      {/* Recent Vehicles */}
      <section className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-autovista-blue">Véhicules récents</h2>
          <Button asChild variant="outline" size="sm" className="text-xs sm:text-sm">
            <Link to="/view-all">Voir tous</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {recentVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-autovista-blue">Propriétés en vedette</h2>
          <Button asChild variant="outline" size="sm" className="text-xs sm:text-sm">
            <Link to="/properties">Voir toutes</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-white py-8 sm:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-autovista-blue">Découvrez Vista360</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm bg-white">
              <div className="mx-auto bg-autovista-teal/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Car className="h-8 w-8 text-autovista-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visite Virtuelle 360°</h3>
              <p className="text-autovista-dark-gray">Découvrez chaque véhicule et propriété en détail avec notre technologie de visite virtuelle 360°. Examinez l'intérieur comme l'extérieur.</p>
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
      <section className="bg-autovista-blue text-white py-8 sm:py-16">
        <div className="container mx-auto px-2 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Vous avez un véhicule ou bien immobilier à vendre?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">Rejoignez notre marketplace et bénéficiez de notre technologie 360° pour mettre en valeur vos biens.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button asChild size="lg" className="bg-white text-autovista-blue hover:bg-gray-100">
              <Link to="/vendre">Publier une annonce</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              <Link to="/about">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 sm:py-10">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">Vista360</h3>
              <p className="text-sm">La première plateforme de vente de véhicules et immobilier avec visite virtuelle 360°.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white">Accueil</Link></li>
                <li><Link to="/vehicules" className="hover:text-white">Véhicules</Link></li>
                <li><Link to="/properties" className="hover:text-white">Immobilier</Link></li>
                <li><Link to="/vendre" className="hover:text-white">Vendre</Link></li>
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
          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Vista360. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
      
      <MobileBottomNavbar />
    </div>
  );
};

export default Index;
