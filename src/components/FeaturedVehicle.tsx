
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface FeaturedVehicleProps {
  id: string;
  title: string;
  image: string;
  price: number;
  year: number;
  mileage: number;
  location: string;
  has360: boolean;
}

const FeaturedVehicle = ({
  id,
  title,
  image,
  price,
  year,
  mileage,
  location,
  has360
}: FeaturedVehicleProps) => {
  return (
    <div className="relative h-[500px] group overflow-hidden rounded-lg animate-fade-in">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      {/* Badge for 360 View */}
      {has360 && (
        <Badge className="absolute top-4 left-4 bg-autovista-teal hover:bg-autovista-teal">
          Visite Virtuelle 360°
        </Badge>
      )}
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="mb-4">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
            <span>{year}</span>
            <span>•</span>
            <span>{mileage.toLocaleString()} km</span>
            <span>•</span>
            <span>{location}</span>
          </div>
          <p className="text-2xl font-bold">{price.toLocaleString()} €</p>
        </div>
        
        <div className="flex gap-3">
          <Button asChild className="bg-autovista-teal hover:bg-autovista-blue w-full sm:w-auto">
            <Link to={`/vehicle/${id}`}>Voir Détails</Link>
          </Button>
          {has360 && (
            <Button variant="outline" className="border-white text-white hover:bg-white/20 w-full sm:w-auto">
              <Link to={`/vehicle/${id}?view=360`}>Visite 360°</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedVehicle;
