import { useState } from 'react';
import Navbar from '@/components/Navbar';
import VehicleCard from '@/components/VehicleCard';
import SearchFilters from '@/components/SearchFilters';

// Mock data pour les véhicules
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
    <div className="min-h-screen bg-autovista-light-gray">
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
    </div>
  );
};

export default Vehicules;
