
import FeaturedVehicle from '@/components/FeaturedVehicle';
import Navbar from '@/components/Navbar';
import VehicleCard from '@/components/VehicleCard';
import SearchFilters from '@/components/SearchFilters';
import MobileBottomNavbar from '@/components/MobileBottomNavbar';
import { Button } from '@/components/ui/button';
import { Car, Eye, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockVehicles = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Tesla Model 3',
    price: 39900,
    year: 2021,
    mileage: 25000,
    fuelType: 'Électrique',
    location: 'Lille',
    has360: false,
    sellerType: 'individual' as const
  }
];

const Index = () => {
  const handleSearch = (filters: any) => {
    console.log('Recherche depuis l\'accueil:', filters);
  };

  return (
    <div className="min-h-screen bg-autovista-light-gray pb-16 md:pb-0">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-autovista-blue to-autovista-teal text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Découvrez AutoVista
            <span className="block text-2xl md:text-3xl mt-2 opacity-90">
              L'avenir de l'achat automobile en 360°
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Explorez chaque véhicule comme si vous y étiez grâce à notre technologie de visite virtuelle immersive
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/vehicules">
              <Button size="lg" className="bg-white text-autovista-blue hover:bg-gray-100 font-semibold px-8 py-3">
                <Car className="mr-2 h-5 w-5" />
                Voir les véhicules
              </Button>
            </Link>
            <Link to="/vendre">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-autovista-blue font-semibold px-8 py-3">
                Vendre mon véhicule
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Vehicle */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FeaturedVehicle />
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-autovista-blue mb-8">
            Trouvez votre véhicule idéal
          </h2>
          <SearchFilters onSearch={handleSearch} />
        </div>
      </section>

      {/* Recent Vehicles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-autovista-blue">Véhicules récents</h2>
            <Link to="/vehicules">
              <Button variant="outline" className="border-autovista-teal text-autovista-teal hover:bg-autovista-teal hover:text-white">
                Voir tous les véhicules
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-autovista-blue mb-12">
            Pourquoi choisir AutoVista ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-autovista-teal bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-autovista-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-autovista-blue">Visite virtuelle 360°</h3>
              <p className="text-autovista-dark-gray">
                Explorez l'intérieur et l'extérieur des véhicules avec notre technologie immersive révolutionnaire
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-autovista-teal bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-autovista-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-autovista-blue">Transparence totale</h3>
              <p className="text-autovista-dark-gray">
                Informations détaillées et historique complet pour chaque véhicule, garantissant votre confiance
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-autovista-teal bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-autovista-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-autovista-blue">Communauté de confiance</h3>
              <p className="text-autovista-dark-gray">
                Vendeurs vérifiés et acheteurs sérieux pour des transactions en toute sécurité
              </p>
            </div>
          </div>
        </div>
      </section>

      <MobileBottomNavbar />
    </div>
  );
};

export default Index;
