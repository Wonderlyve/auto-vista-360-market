
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import VehicleCard from '@/components/VehicleCard';
import SearchFilters from '@/components/SearchFilters';
import MobileBottomNavbar from '@/components/MobileBottomNavbar';

// Mock data pour les véhicules avec beaucoup plus d'options
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
  },
  {
    id: '5',
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
    id: '6',
    image: 'https://images.unsplash.com/photo-1554223090-7e482851df45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
    title: 'Mercedes-Benz E 220d AMG Line',
    price: 49990,
    year: 2023,
    mileage: 15000,
    fuelType: 'Diesel',
    location: 'Paris',
    has360: true,
    sellerType: 'professional' as const
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Volkswagen Golf VIII',
    price: 26500,
    year: 2021,
    mileage: 32000,
    fuelType: 'Essence',
    location: 'Nantes',
    has360: false,
    sellerType: 'individual' as const
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Ford Focus Titanium',
    price: 22900,
    year: 2020,
    mileage: 38000,
    fuelType: 'Diesel',
    location: 'Strasbourg',
    has360: true,
    sellerType: 'professional' as const
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Nissan Qashqai',
    price: 28500,
    year: 2022,
    mileage: 22000,
    fuelType: 'Hybride',
    location: 'Montpellier',
    has360: false,
    sellerType: 'individual' as const
  },
  {
    id: '10',
    image: 'https://images.unsplash.com/photo-1494976688153-c65f2e6d49f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Citroën C4 Cactus',
    price: 19500,
    year: 2019,
    mileage: 55000,
    fuelType: 'Essence',
    location: 'Rennes',
    has360: true,
    sellerType: 'professional' as const
  },
  {
    id: '11',
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Honda Civic Type R',
    price: 42000,
    year: 2022,
    mileage: 18000,
    fuelType: 'Essence',
    location: 'Nice',
    has360: false,
    sellerType: 'individual' as const
  },
  {
    id: '12',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Jeep Compass',
    price: 31500,
    year: 2021,
    mileage: 29000,
    fuelType: 'Diesel',
    location: 'Grenoble',
    has360: true,
    sellerType: 'professional' as const
  },
  {
    id: '13',
    image: 'https://images.unsplash.com/photo-1487191031500-d0e9e6fb8efb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Hyundai Tucson',
    price: 27900,
    year: 2020,
    mileage: 44000,
    fuelType: 'Hybride',
    location: 'Dijon',
    has360: false,
    sellerType: 'individual' as const
  },
  {
    id: '14',
    image: 'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Mazda CX-5',
    price: 33900,
    year: 2021,
    mileage: 26000,
    fuelType: 'Essence',
    location: 'Clermont-Ferrand',
    has360: true,
    sellerType: 'professional' as const
  },
  {
    id: '15',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Škoda Octavia',
    price: 24900,
    year: 2020,
    mileage: 41000,
    fuelType: 'Diesel',
    location: 'Tours',
    has360: false,
    sellerType: 'individual' as const
  },
  {
    id: '16',
    image: 'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Kia Sportage',
    price: 29500,
    year: 2021,
    mileage: 31000,
    fuelType: 'Hybride',
    location: 'Angers',
    has360: true,
    sellerType: 'professional' as const
  }
];

const Vehicules = () => {
  const [filteredVehicles, setFilteredVehicles] = useState(mockVehicles);

  const handleSearch = (filters: any) => {
    console.log('Recherche avec filtres:', filters);
    // Ici vous pouvez implémenter la logique de filtrage
    setFilteredVehicles(mockVehicles);
  };

  return (
    <div className="min-h-screen bg-autovista-light-gray pb-16 md:pb-0">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-autovista-blue mb-8">Tous nos véhicules</h1>
        
        {/* Filtres de recherche */}
        <div className="mb-8">
          <SearchFilters onSearch={handleSearch} />
        </div>
        
        {/* Grille de véhicules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>
        
        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-autovista-dark-gray text-lg">Aucun véhicule ne correspond à vos critères.</p>
          </div>
        )}
      </div>
      
      <MobileBottomNavbar />
    </div>
  );
};

export default Vehicules;
