
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface VehicleCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  fuelType: string;
  location: string;
  has360: boolean;
  sellerType: 'professional' | 'individual';
}

const VehicleCard = ({
  id,
  image,
  title,
  price,
  year,
  mileage,
  fuelType,
  location,
  has360,
  sellerType
}: VehicleCardProps) => {
  return (
    <Link to={`/vehicle/${id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] animate-scale-in">
        <div className="relative h-48">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover"
          />
          {has360 && (
            <Badge className="absolute top-2 left-2 bg-autovista-teal hover:bg-autovista-teal">
              360°
            </Badge>
          )}
          <Badge 
            className={`absolute top-2 right-2 ${
              sellerType === 'professional' 
                ? 'bg-autovista-blue hover:bg-autovista-blue' 
                : 'bg-autovista-dark-gray hover:bg-autovista-dark-gray'
            }`}
          >
            {sellerType === 'professional' ? 'Pro' : 'Particulier'}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
          <p className="font-bold text-xl text-autovista-blue mb-2">
            {price.toLocaleString()} €
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm text-autovista-dark-gray">
            <div>Année: {year}</div>
            <div>Kilométrage: {mileage.toLocaleString()}</div>
            <div>Carburant: {fuelType}</div>
            <div>Lieu: {location}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VehicleCard;
