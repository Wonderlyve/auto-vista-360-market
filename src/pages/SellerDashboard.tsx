
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import MobileBottomNavbar from '@/components/MobileBottomNavbar';
import { Car, MessageCircle, User, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const sellerData = {
  name: 'Garage Premium',
  type: 'professional',
  joinDate: '2022-05-10',
  rating: 4.8,
  reviews: 42,
  activeListings: 8,
  soldVehicles: 35,
  profileImage: 'https://images.unsplash.com/photo-1560286756-4775327f521e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
};

const vehicleListings = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1554223090-7e482851df45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
    title: 'Mercedes-Benz E 220d AMG Line',
    price: 49990,
    year: 2023,
    mileage: 15000,
    location: 'Paris',
    status: 'active',
    views: 245,
    messages: 8,
    has360: true
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    title: 'BMW Série 4 Gran Coupé',
    price: 45500,
    year: 2022,
    mileage: 28000,
    location: 'Lyon',
    status: 'active',
    views: 175,
    messages: 5,
    has360: true
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2336&q=80',
    title: 'Renault Clio V',
    price: 18990,
    year: 2020,
    mileage: 42000,
    location: 'Toulouse',
    status: 'active',
    views: 98,
    messages: 3,
    has360: false
  }
];

const messages = [
  {
    id: 'm1',
    vehicleId: '1',
    vehicleTitle: 'Mercedes-Benz E 220d',
    buyerName: 'Thomas Dupont',
    lastMessage: 'Est-ce que le prix est négociable?',
    time: '14:35',
    unread: true,
    buyerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  },
  {
    id: 'm2',
    vehicleId: '2',
    vehicleTitle: 'BMW Série 4 Gran Coupé',
    buyerName: 'Sophie Martin',
    lastMessage: 'Bonjour, est-ce que la voiture est toujours disponible?',
    time: '12:08',
    unread: false,
    buyerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  }
];

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('listings');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const filteredListings = filterStatus === 'all' 
    ? vehicleListings 
    : vehicleListings.filter(v => v.status === filterStatus);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Seller Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img 
                      src={sellerData.profileImage} 
                      alt={sellerData.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h2 className="text-xl font-bold">{sellerData.name}</h2>
                  <Badge className="mt-2 bg-blue-600">
                    {sellerData.type === 'professional' ? 'Professionnel' : 'Particulier'}
                  </Badge>
                  
                  <div className="flex items-center mt-3">
                    <div className="flex text-yellow-500">
                      {'★'.repeat(Math.floor(sellerData.rating))}
                      {sellerData.rating % 1 >= 0.5 ? '★' : ''}
                      {'☆'.repeat(5 - Math.ceil(sellerData.rating))}
                    </div>
                    <span className="ml-1 text-sm text-gray-600">({sellerData.reviews} avis)</span>
                  </div>
                  
                  <div className="mt-6 w-full grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-3xl font-bold text-blue-600">{sellerData.activeListings}</p>
                      <p className="text-sm text-gray-600">Annonces actives</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-3xl font-bold text-green-600">{sellerData.soldVehicles}</p>
                      <p className="text-sm text-gray-600">Véhicules vendus</p>
                    </div>
                  </div>
                  
                  <Button asChild className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
                    <Link to="/vendre">Ajouter une annonce</Link>
                  </Button>
                  
                  <Link to="/profile" className="mt-3 text-sm text-blue-600 hover:underline">
                    Modifier le profil
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full md:w-3/4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="listings">
                  <Car className="h-4 w-4 mr-2" />
                  Mes annonces
                </TabsTrigger>
                <TabsTrigger value="messages">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Messages
                  {messages.filter(m => m.unread).length > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {messages.filter(m => m.unread).length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="listings" className="mt-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <span className="mr-3">Filtrer:</span>
                    <div className="flex space-x-2">
                      <Button 
                        variant={filterStatus === 'all' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setFilterStatus('all')}
                      >
                        Toutes
                      </Button>
                      <Button 
                        variant={filterStatus === 'active' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setFilterStatus('active')}
                      >
                        Actives
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredListings.map(vehicle => (
                    <Card key={vehicle.id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative sm:w-48 h-48">
                          <img 
                            src={vehicle.image} 
                            alt={vehicle.title} 
                            className="w-full h-full object-cover"
                          />
                          {vehicle.has360 && (
                            <Badge className="absolute top-2 left-2 bg-blue-600">
                              360°
                            </Badge>
                          )}
                          <Badge className="absolute top-2 right-2 bg-green-600">
                            Active
                          </Badge>
                        </div>
                        <CardContent className="p-6 flex-1">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{vehicle.title}</h3>
                              <p className="font-bold text-xl text-blue-600 mb-2">
                                {vehicle.price.toLocaleString()} €
                              </p>
                              <div className="text-sm text-gray-600 mb-4">
                                <span>{vehicle.year}</span>
                                <span className="mx-2">•</span>
                                <span>{vehicle.mileage.toLocaleString()} km</span>
                                <span className="mx-2">•</span>
                                <span>{vehicle.location}</span>
                              </div>
                            </div>
                            <div className="mt-2 sm:mt-0 flex sm:flex-col items-center sm:items-end space-x-4 sm:space-x-0 sm:space-y-2">
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span className="text-sm">{vehicle.views}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="h-4 w-4 text-gray-600 mr-1" />
                                <span className="text-sm">{vehicle.messages}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/vehicle/${vehicle.id}`}>Voir l'annonce</Link>
                            </Button>
                            <Button variant="outline" size="sm">Modifier</Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="messages" className="mt-6">
                <div className="space-y-4">
                  {messages.map(message => (
                    <Card key={message.id} className={`overflow-hidden transition-all ${message.unread ? 'border-l-4 border-l-blue-600' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img 
                              src={message.buyerImage} 
                              alt={message.buyerName} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold">{message.buyerName}</span>
                              <span className="text-xs text-gray-600">{message.time}</span>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              À propos de: <Link to={`/vehicle/${message.vehicleId}`} className="text-blue-600 hover:underline">{message.vehicleTitle}</Link>
                            </div>
                            <p className="text-sm truncate">{message.lastMessage}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/chat/${message.id}`}>
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Répondre
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <MobileBottomNavbar />
    </div>
  );
};

export default SellerDashboard;
