
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

interface FeaturedVehiclesCarouselProps {
  vehicles: FeaturedVehicleProps[];
}

const FeaturedVehicleSlide = ({
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
    <div className="relative h-[250px] group overflow-hidden rounded-lg">
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
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="mb-3">
          <h2 className="text-xl font-bold mb-1">{title}</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
            <span>{year}</span>
            <span>•</span>
            <span>{mileage.toLocaleString()} km</span>
            <span>•</span>
            <span>{location}</span>
          </div>
          <p className="text-lg font-bold">{price.toLocaleString()} €</p>
        </div>
        
        <div className="flex gap-2">
          <Button asChild size="sm" className="bg-autovista-teal hover:bg-autovista-blue">
            <Link to={`/vehicle/${id}`}>Voir Détails</Link>
          </Button>
          {has360 && (
            <Button variant="outline" size="sm" className="border-white text-white hover:bg-white/20">
              <Link to={`/vehicle/${id}?view=360`}>Visite 360°</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const FeaturedVehicle = ({ vehicles }: FeaturedVehiclesCarouselProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-autovista-blue mb-8 text-center">
        Véhicules à la une
      </h2>
      <Carousel className="w-full">
        <CarouselContent>
          {vehicles.map((vehicle) => (
            <CarouselItem key={vehicle.id}>
              <FeaturedVehicleSlide {...vehicle} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FeaturedVehicle;
