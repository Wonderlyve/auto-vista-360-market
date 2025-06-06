
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import VehicleCard from '@/components/VehicleCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Grid, List } from 'lucide-react';

// Mock data pour les véhicules
const allVehicles = [
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
    sellerType: 'professional' as const,
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
    sellerType: 'professional' as const,
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
    sellerType: 'individual' as const,
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
    sellerType: 'professional' as const,
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
    sellerType: 'individual' as const,
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
    sellerType: 'professional' as const,
  },
  {
    id: '7',
    title: 'Tesla Model 3 Long Range',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    price: 52900,
    year: 2023,
    mileage: 5000,
    fuelType: 'Électrique',
    transmission: 'Automatique',
    location: 'Lyon',
    has360: true,
    sellerType: 'individual' as const,
  },
  {
    id: '8',
    title: 'Ford Mustang Mach-E',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    price: 48500,
    year: 2022,
    mileage: 12000,
    fuelType: 'Électrique',
    transmission: 'Automatique',
    location: 'Bordeaux',
    has360: false,
    sellerType: 'professional' as const,
  }
];

const ViewAll = () => {
  const [vehicles, setVehicles] = useState(allVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-low');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = allVehicles.filter(vehicle =>
      vehicle.title.toLowerCase().includes(term.toLowerCase()) ||
      vehicle.location.toLowerCase().includes(term.toLowerCase()) ||
      vehicle.fuelType.toLowerCase().includes(term.toLowerCase())
    );
    setVehicles(filtered);
  };

  const handleSort = (sortValue: string) => {
    setSortBy(sortValue);
    const sorted = [...vehicles].sort((a, b) => {
      switch (sortValue) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'year-new':
          return b.year - a.year;
        case 'year-old':
          return a.year - b.year;
        case 'mileage-low':
          return a.mileage - b.mileage;
        case 'mileage-high':
          return b.mileage - a.mileage;
        default:
          return 0;
      }
    });
    setVehicles(sorted);
  };

  return (
    <div className="min-h-screen bg-autovista-light-gray">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-autovista-blue mb-4">
            Tous les véhicules
          </h1>
          <p className="text-autovista-dark-gray">
            Découvrez notre sélection complète de véhicules disponibles
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-autovista-dark-gray" />
              <Input
                placeholder="Rechercher un véhicule..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Prix croissant</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
                <SelectItem value="year-new">Plus récents</SelectItem>
                <SelectItem value="year-old">Plus anciens</SelectItem>
                <SelectItem value="mileage-low">Km croissant</SelectItem>
                <SelectItem value="mileage-high">Km décroissant</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-autovista-dark-gray">
            {vehicles.length} véhicule{vehicles.length > 1 ? 's' : ''} trouvé{vehicles.length > 1 ? 's' : ''}
          </p>
          <Link to="/vehicules">
            <Button variant="outline">
              Filtres avancés
            </Button>
          </Link>
        </div>

        {/* Vehicle Grid */}
        {vehicles.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Search className="mx-auto h-12 w-12 text-autovista-dark-gray mb-4" />
            <h2 className="text-xl font-semibold mb-2">Aucun véhicule trouvé</h2>
            <p className="text-autovista-dark-gray mb-4">
              Essayez de modifier vos critères de recherche
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setVehicles(allVehicles);
            }}>
              Réinitialiser la recherche
            </Button>
          </div>
        )}

        {/* Load More */}
        {vehicles.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Charger plus de véhicules
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAll;
