
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import VehicleCard from '@/components/VehicleCard';
import SearchFilters from '@/components/SearchFilters';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';

// Types
interface Vehicle {
  id: string;
  title: string;
  image: string;
  price: number;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  location: string;
  has360: boolean;
  sellerType: 'professional' | 'individual';
}

// Mock data
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    title: 'Mercedes-Benz E 220d AMG Line',
    image: 'https://images.unsplash.com/photo-1554223090-7e482851df45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    price: 49990,
    year: 2023,
    mileage: 15000,
    fuelType: 'Diesel',
    transmission: 'Automatique',
    location: 'Paris',
    has360: true,
    sellerType: 'professional',
  },
  {
    id: '2',
    title: 'BMW Série 3 320d xDrive',
    image: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    price: 45900,
    year: 2022,
    mileage: 25000,
    fuelType: 'Diesel',
    transmission: 'Automatique',
    location: 'Lyon',
    has360: false,
    sellerType: 'professional',
  },
  {
    id: '3',
    title: 'Audi A4 40 TDI Quattro',
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    price: 42500,
    year: 2021,
    mileage: 32000,
    fuelType: 'Diesel',
    transmission: 'Automatique',
    location: 'Toulouse',
    has360: true,
    sellerType: 'individual',
  },
  {
    id: '4',
    title: 'Volkswagen Golf 8 GTI',
    image: 'https://images.unsplash.com/photo-1543854589-1bc8bd701769?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    price: 39900,
    year: 2022,
    mileage: 18000,
    fuelType: 'Essence',
    transmission: 'Manuelle',
    location: 'Marseille',
    has360: false,
    sellerType: 'professional',
  },
  {
    id: '5',
    title: 'Peugeot 3008 GT Line',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    price: 34990,
    year: 2020,
    mileage: 45000,
    fuelType: 'Diesel',
    transmission: 'Automatique',
    location: 'Nice',
    has360: true,
    sellerType: 'individual',
  },
  {
    id: '6',
    title: 'Renault Mégane E-Tech',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    price: 37500,
    year: 2022,
    mileage: 10000,
    fuelType: 'Électrique',
    transmission: 'Automatique',
    location: 'Paris',
    has360: true,
    sellerType: 'professional',
  }
];

const VehiculesPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100000,
    minYear: 2010,
    maxYear: new Date().getFullYear(),
    fuelType: '',
    transmission: '',
    sellerType: '',
    has360: false
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch vehicles
    setTimeout(() => {
      setVehicles(mockVehicles);
      setLoading(false);
    }, 500);
  }, []);
  
  const handleFilterChange = (newFilters: any) => {
    setFilters({...filters, ...newFilters});
    
    // In a real app, you would fetch filtered results from an API
    // For now, we'll simulate filtering client-side
    const filtered = mockVehicles.filter(vehicle => {
      return (
        vehicle.price >= filters.minPrice &&
        vehicle.price <= filters.maxPrice &&
        vehicle.year >= filters.minYear &&
        vehicle.year <= filters.maxYear &&
        (filters.fuelType === '' || vehicle.fuelType === filters.fuelType) &&
        (filters.transmission === '' || vehicle.transmission === filters.transmission) &&
        (filters.sellerType === '' || vehicle.sellerType === filters.sellerType) &&
        (!filters.has360 || vehicle.has360)
      );
    });
    
    setVehicles(filtered.length > 0 ? filtered : mockVehicles);
  };

  return (
    <div className="min-h-screen bg-autovista-light-gray">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <SearchFilters onChange={handleFilterChange} />
            </div>
            
            <div className="bg-autovista-teal text-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-3">Vous vendez un véhicule?</h3>
              <p className="mb-4 text-sm">Créez une annonce et trouvez rapidement un acheteur.</p>
              <Button asChild variant="secondary" className="w-full">
                <a href="/vendre">
                  <Car className="mr-2 h-4 w-4" />
                  Vendre mon véhicule
                </a>
              </Button>
            </div>
          </div>
          
          {/* Vehicle Listings */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-autovista-blue">Véhicules disponibles</h1>
              <p className="text-autovista-dark-gray">
                {vehicles.length} annonces
              </p>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md h-80 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded mb-3 w-1/2"></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {vehicles.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <Car className="mx-auto h-12 w-12 text-autovista-dark-gray mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Aucun véhicule trouvé</h2>
                    <p className="text-autovista-dark-gray">Ajustez vos filtres pour voir plus de résultats</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map((vehicle) => (
                      <VehicleCard key={vehicle.id} {...vehicle} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiculesPage;
