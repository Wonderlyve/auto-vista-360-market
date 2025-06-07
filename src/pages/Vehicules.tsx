
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import VehicleCard from '@/components/VehicleCard';
import SearchFilters from '@/components/SearchFilters';
import MobileBottomNavbar from '@/components/MobileBottomNavbar';

// Mock data pour les véhicules avec plus d'options
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
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Range Rover Evoque',
    price: 42500,
    year: 2020,
    mileage: 32000,
    fuelType: 'Diesel',
    location: 'Montpellier',
    has360: false,
    sellerType: 'individual' as const
  },
  {
    id: '10',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Ford Mustang GT',
    price: 55900,
    year: 2022,
    mileage: 8000,
    fuelType: 'Essence',
    location: 'Nancy',
    has360: true,
    sellerType: 'professional' as const
  },
  {
    id: '11',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Jaguar F-Type',
    price: 67500,
    year: 2021,
    mileage: 16000,
    fuelType: 'Essence',
    location: 'Cannes',
    has360: true,
    sellerType: 'individual' as const
  },
  {
    id: '12',
    image: 'https://images.unsplash.com/photo-1494976444042-6be4eb3a8c9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'Citroën C3 Aircross',
    price: 22900,
    year: 2021,
    mileage: 38000,
    fuelType: 'Essence',
    location: 'Rennes',
    has360: false,
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
