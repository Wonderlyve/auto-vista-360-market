
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Filter, Search } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (filters: any) => void;
}

const SearchFilters = ({ onSearch }: SearchFiltersProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [keyword, setKeyword] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [has360, setHas360] = useState(false);
  
  const handleSearch = () => {
    onSearch({
      keyword,
      make,
      model,
      priceFrom: priceRange[0],
      priceTo: priceRange[1],
      yearFrom: yearFrom ? parseInt(yearFrom) : null,
      yearTo: yearTo ? parseInt(yearTo) : null,
      fuelType,
      has360
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-grow relative">
          <Input
            placeholder="Rechercher par marque, modèle..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-autovista-dark-gray" />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtres
          </Button>
          <Button 
            onClick={handleSearch}
            className="bg-autovista-teal hover:bg-autovista-blue"
          >
            Rechercher
          </Button>
        </div>
      </div>
      
      {isFiltersOpen && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
          <div>
            <Label htmlFor="make">Marque</Label>
            <Select value={make} onValueChange={setMake}>
              <SelectTrigger id="make">
                <SelectValue placeholder="Toutes les marques" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="audi">Audi</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="mercedes">Mercedes</SelectItem>
                <SelectItem value="renault">Renault</SelectItem>
                <SelectItem value="peugeot">Peugeot</SelectItem>
                <SelectItem value="citroen">Citroën</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="model">Modèle</Label>
            <Select value={model} onValueChange={setModel} disabled={!make}>
              <SelectTrigger id="model">
                <SelectValue placeholder="Tous les modèles" />
              </SelectTrigger>
              <SelectContent>
                {make === 'audi' && (
                  <>
                    <SelectItem value="a1">A1</SelectItem>
                    <SelectItem value="a3">A3</SelectItem>
                    <SelectItem value="a4">A4</SelectItem>
                  </>
                )}
                {make === 'bmw' && (
                  <>
                    <SelectItem value="serie1">Série 1</SelectItem>
                    <SelectItem value="serie3">Série 3</SelectItem>
                    <SelectItem value="serie5">Série 5</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Prix (€)</Label>
            <div className="pt-6 px-2">
              <Slider
                defaultValue={[0, 100000]}
                max={100000}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-sm mt-2">
                <span>{priceRange[0].toLocaleString()} €</span>
                <span>{priceRange[1].toLocaleString()} €</span>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="fuel">Type de carburant</Label>
            <Select value={fuelType} onValueChange={setFuelType}>
              <SelectTrigger id="fuel">
                <SelectValue placeholder="Tous" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="essence">Essence</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="hybrid">Hybride</SelectItem>
                <SelectItem value="electric">Électrique</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="yearFrom">Année de</Label>
            <Select value={yearFrom} onValueChange={setYearFrom}>
              <SelectTrigger id="yearFrom">
                <SelectValue placeholder="Min" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 25 }, (_, i) => 2000 + i).map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="yearTo">Année à</Label>
            <Select value={yearTo} onValueChange={setYearTo}>
              <SelectTrigger id="yearTo">
                <SelectValue placeholder="Max" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 25 }, (_, i) => 2000 + i).map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="has360" 
              checked={has360} 
              onChange={(e) => setHas360(e.target.checked)}
              className="w-4 h-4 accent-autovista-teal"
            />
            <Label htmlFor="has360" className="cursor-pointer">Visite 360° uniquement</Label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
