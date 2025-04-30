
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { MessageCircle, Car } from 'lucide-react';

// Mock vehicle data
const vehicleData = {
  id: '1',
  title: 'Mercedes-Benz E 220d AMG Line',
  description: "Cette Mercedes-Benz E 220d AMG Line est dans un état impeccable. Première main, entretenue régulièrement chez Mercedes. Intérieur cuir noir, toit ouvrant panoramique, système de navigation COMAND, aide au stationnement avec caméras 360°, phares LED, jantes AMG 19 pouces.",
  price: 49990,
  year: 2023,
  mileage: 15000,
  fuelType: 'Diesel',
  transmission: 'Automatique',
  power: '194 ch',
  color: 'Noir',
  doors: 4,
  location: 'Paris',
  sellerName: 'Garage Premium',
  sellerType: 'professional',
  sellerRating: 4.8,
  sellerReviews: 42,
  has360: true,
  images: [
    'https://images.unsplash.com/photo-1554223090-7e482851df45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1583267746897-2cf415887172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1543854589-1bc8bd701769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  ],
  features: [
    'Climatisation automatique',
    'Navigation GPS',
    'Sièges en cuir',
    'Toit panoramique',
    'Caméra de recul',
    'Régulateur de vitesse adaptatif',
    'Système audio premium',
    'Détecteur d'angle mort',
    'Assistance au stationnement',
    'Démarrage sans clé'
  ]
};

const VehicleDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [activeImage, setActiveImage] = useState(0);
  const [vehicle, setVehicle] = useState(vehicleData);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(searchParams.get('view') === '360' ? 'view360' : 'gallery');
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setVehicle(vehicleData);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleContactSeller = () => {
    console.log('Contact seller for vehicle:', id);
    // In a real app, this would open a chat or contact form
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-autovista-light-gray">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-autovista-blue mx-auto mb-4"></div>
            <p className="text-autovista-dark-gray">Chargement des détails du véhicule...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-autovista-light-gray">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-autovista-blue">{vehicle.title}</h1>
                <div className="flex items-center mt-2 text-autovista-dark-gray">
                  <span>Année {vehicle.year}</span>
                  <span className="mx-2">•</span>
                  <span>{vehicle.mileage.toLocaleString()} km</span>
                  <span className="mx-2">•</span>
                  <span>{vehicle.location}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-3xl font-bold text-autovista-blue">{vehicle.price.toLocaleString()} €</p>
              </div>
            </div>
          </div>
          
          {/* Image Gallery / 360 View Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="p-4 bg-gray-50 border-b">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
                <TabsTrigger value="gallery" className="text-sm sm:text-base">Galerie Photos</TabsTrigger>
                <TabsTrigger 
                  value="view360" 
                  className="text-sm sm:text-base"
                  disabled={!vehicle.has360}
                >
                  Vue 360°
                </TabsTrigger>
              </TabsList>
            </div>
          
            <TabsContent value="gallery" className="m-0">
              {/* Main Image */}
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
                <img 
                  src={vehicle.images[activeImage]} 
                  alt={vehicle.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnails */}
              <div className="flex overflow-x-auto p-4 gap-2 bg-gray-50">
                {vehicle.images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`w-20 h-20 flex-shrink-0 rounded cursor-pointer border-2 ${
                      index === activeImage ? 'border-autovista-teal' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={img} 
                      alt={`${vehicle.title} - Vue ${index + 1}`} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="view360" className="m-0">
              <div className="h-[300px] sm:h-[400px] md:h-[500px] bg-gray-100 flex items-center justify-center">
                {vehicle.has360 ? (
                  <div className="text-center">
                    <p className="text-lg mb-2">Vue 360° interactive</p>
                    <div className="mx-auto bg-autovista-teal/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <Car className="h-8 w-8 text-autovista-teal animate-pulse" />
                    </div>
                    <p className="text-sm text-autovista-dark-gray">
                      Dans une version complète, cette section afficherait une vue interactive 360° du véhicule.
                    </p>
                  </div>
                ) : (
                  <p>Vue 360° non disponible pour ce véhicule</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Left Column - Vehicle Details */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-autovista-dark-gray mb-6">{vehicle.description}</p>
              
              <h2 className="text-xl font-semibold mb-4">Caractéristiques</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-autovista-dark-gray">Année</span>
                  <span className="font-medium">{vehicle.year}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-autovista-dark-gray">Kilométrage</span>
                  <span className="font-medium">{vehicle.mileage.toLocaleString()} km</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-autovista-dark-gray">Carburant</span>
                  <span className="font-medium">{vehicle.fuelType}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-autovista-dark-gray">Transmission</span>
                  <span className="font-medium">{vehicle.transmission}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-autovista-dark-gray">Puissance</span>
                  <span className="font-medium">{vehicle.power}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-autovista-dark-gray">Couleur</span>
                  <span className="font-medium">{vehicle.color}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-autovista-dark-gray">Portes</span>
                  <span className="font-medium">{vehicle.doors}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-autovista-dark-gray">Lieu</span>
                  <span className="font-medium">{vehicle.location}</span>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-4">Équipements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-6">
                {vehicle.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="h-4 w-4 text-autovista-teal mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Seller Info & Actions */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Vendeur</h2>
                <div className="flex items-center mb-4">
                  <div className="bg-autovista-blue text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold mr-3">
                    {vehicle.sellerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{vehicle.sellerName}</p>
                    <div className="flex items-center">
                      <Badge className={vehicle.sellerType === 'professional' ? 'bg-autovista-blue' : 'bg-autovista-dark-gray'}>
                        {vehicle.sellerType === 'professional' ? 'Professionnel' : 'Particulier'}
                      </Badge>
                      {vehicle.sellerType === 'professional' && (
                        <div className="ml-2 flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm ml-1">{vehicle.sellerRating}</span>
                          <span className="text-xs text-autovista-dark-gray ml-1">({vehicle.sellerReviews})</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleContactSeller} 
                  className="w-full bg-autovista-teal hover:bg-autovista-blue"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contacter le vendeur
                </Button>
                
                <p className="text-xs text-center mt-4 text-autovista-dark-gray">
                  Contactez le vendeur pour plus d'informations ou pour organiser une visite
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Partager ce véhicule</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
