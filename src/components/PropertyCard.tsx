
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Home, Bed, Bath, Square } from "lucide-react";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: string;
    location: string;
    type: string;
    bedrooms?: number;
    bathrooms?: number;
    surface?: number;
    image: string;
    features?: string[];
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-48 object-cover"
          />
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 bg-white/90 text-gray-800"
          >
            {property.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{property.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          {property.bedrooms && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.surface && (
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{property.surface}m²</span>
            </div>
          )}
        </div>
        
        {property.features && property.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {property.features.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {property.features.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{property.features.length - 2}
              </Badge>
            )}
          </div>
        )}
        
        <div className="font-bold text-xl text-blue-600">{property.price}</div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Home className="h-4 w-4 mr-1" />
          Visite 360°
        </Button>
        <Button size="sm" className="flex-1">
          Détails
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
