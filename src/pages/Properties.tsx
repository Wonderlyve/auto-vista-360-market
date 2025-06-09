
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import MobileBottomNavbar from '@/components/MobileBottomNavbar';
import PropertyCard from '@/components/PropertyCard';
import SearchFilters from '@/components/SearchFilters';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Données d'exemple pour les propriétés
  const properties = [
    {
      id: '1',
      title: 'Villa moderne avec piscine',
      price: '$450,000',
      location: 'Kinshasa, Gombe',
      type: 'Villa',
      bedrooms: 4,
      bathrooms: 3,
      surface: 300,
      image: '/placeholder.svg',
      features: ['Piscine', 'Garage', 'Jardin', 'Climatisation']
    },
    {
      id: '2',
      title: 'Appartement standing centre-ville',
      price: '$180,000',
      location: 'Kinshasa, Lingwala',
      type: 'Appartement',
      bedrooms: 3,
      bathrooms: 2,
      surface: 120,
      image: '/placeholder.svg',
      features: ['Balcon', 'Ascenseur', 'Parking']
    },
    {
      id: '3',
      title: 'Maison familiale avec grand terrain',
      price: '$220,000',
      location: 'Kinshasa, Lemba',
      type: 'Maison',
      bedrooms: 5,
      bathrooms: 3,
      surface: 250,
      image: '/placeholder.svg',
      features: ['Grand terrain', 'Véranda', 'Cuisine équipée']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 pb-20">
        {/* En-tête de recherche */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Immobilier</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher une propriété..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="maison">Maison</SelectItem>
                  <SelectItem value="appartement">Appartement</SelectItem>
                  <SelectItem value="terrain">Terrain</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="px-3"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filtres */}
        {showFilters && (
          <div className="mb-6">
            <SearchFilters />
          </div>
        )}

        {/* Grille des propriétés */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Message si aucun résultat */}
        {properties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune propriété trouvée</p>
          </div>
        )}
      </div>

      <MobileBottomNavbar />
    </div>
  );
};

export default Properties;
