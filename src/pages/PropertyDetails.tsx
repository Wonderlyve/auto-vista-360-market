
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import MobileBottomNavbar from '@/components/MobileBottomNavbar';
import VehicleViewer360 from '@/components/VehicleViewer360';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Home, Bed, Bath, Square, Phone, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyDetails = () => {
  const { id } = useParams();
  const [showViewer360, setShowViewer360] = useState(false);

  // Données d'exemple - dans une vraie app, ceci viendrait d'une API
  const property = {
    id: id,
    title: 'Villa moderne avec piscine',
    price: '450,000 $',
    location: 'Kinshasa, Gombe',
    type: 'Villa',
    bedrooms: 4,
    bathrooms: 3,
    surface: 300,
    images: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    ],
    features: ['Piscine', 'Garage', 'Jardin', 'Climatisation', 'Cuisine équipée', 'Terrasse'],
    description: 'Magnifique villa moderne située dans le quartier prestigieux de Gombe. Cette propriété exceptionnelle offre un cadre de vie luxueux avec une piscine privée, un grand jardin paysager et une vue imprenable. Cuisine entièrement équipée, salon spacieux avec cheminée, chambres avec suites parentales.',
    yearBuilt: 2020,
    parkingSpaces: 2,
    seller: {
      name: 'Agence Vista Immobilier',
      phone: '+243 123 456 789',
      email: 'contact@vista-immobilier.cd'
    }
  };

  if (showViewer360) {
    return (
      <div className="min-h-screen bg-gray-900 relative">
        <Button
          onClick={() => setShowViewer360(false)}
          className="absolute top-4 left-4 z-50 bg-white/20 hover:bg-white/30 text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <VehicleViewer360 vehicleId={id!} type="property" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 pb-20">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/properties" className="text-blue-600 hover:underline">
            ← Retour aux propriétés
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images et visite 360° */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image principale */}
            <div className="relative">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <Button
                onClick={() => setShowViewer360(true)}
                className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700"
              >
                <Home className="h-4 w-4 mr-2" />
                Visite 360°
              </Button>
            </div>

            {/* Galerie d'images */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.title} - Image ${index + 2}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Caractéristiques */}
            <Card>
              <CardHeader>
                <CardTitle>Caractéristiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{property.bedrooms} chambres</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{property.bathrooms} salles de bain</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{property.surface} m²</span>
                  </div>
                  <div className="flex items-center">
                    <Home className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Construit en {property.yearBuilt}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{property.parkingSpaces} places de parking</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Équipements</h4>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations principales */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <Badge variant="secondary" className="mb-2">
                    {property.type}
                  </Badge>
                  <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-6">
                    {property.price}
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Contacter le vendeur
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Envoyer un message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Informations vendeur */}
            <Card>
              <CardHeader>
                <CardTitle>Vendeur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold">{property.seller.name}</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{property.seller.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{property.seller.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <MobileBottomNavbar />
    </div>
  );
};

export default PropertyDetails;
