
import { useState } from "react";
import Navbar from "@/components/Navbar";
import MobileBottomNavbar from "@/components/MobileBottomNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Car, Eye, MessageSquare, DollarSign, Home, Building } from "lucide-react";

const SellerDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('vehicles');

  // Données d'exemple pour les véhicules
  const vehicles = [
    {
      id: 1,
      title: "Toyota Corolla 2020",
      price: "$15,000",
      status: "active",
      views: 156,
      messages: 8,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Honda Civic 2019",
      price: "$18,500",
      status: "sold",
      views: 89,
      messages: 12,
      image: "/placeholder.svg"
    }
  ];

  // Données d'exemple pour l'immobilier
  const properties = [
    {
      id: 1,
      title: "Villa moderne Gombe",
      price: "$450,000",
      status: "active",
      views: 234,
      messages: 15,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Appartement Lingwala",
      price: "$180,000",
      status: "reserved",
      views: 167,
      messages: 9,
      image: "/placeholder.svg"
    }
  ];

  const currentItems = activeCategory === 'vehicles' ? vehicles : properties;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-gray-100 text-gray-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'sold': return 'Vendu';
      case 'reserved': return 'Réservé';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Tableau de bord vendeur</h1>
          <p className="text-gray-600">Gérez vos annonces automobiles et immobilières</p>
        </div>

        {/* Sélection de catégorie */}
        <div className="mb-6">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="vehicles" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Automobiles
              </TabsTrigger>
              <TabsTrigger value="properties" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Immobilier
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total annonces</p>
                  <p className="text-2xl font-bold">{currentItems.length}</p>
                </div>
                {activeCategory === 'vehicles' ? (
                  <Car className="h-8 w-8 text-blue-600" />
                ) : (
                  <Building className="h-8 w-8 text-blue-600" />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Vues totales</p>
                  <p className="text-2xl font-bold">
                    {currentItems.reduce((sum, item) => sum + item.views, 0)}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Messages</p>
                  <p className="text-2xl font-bold">
                    {currentItems.reduce((sum, item) => sum + item.messages, 0)}
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Actives</p>
                  <p className="text-2xl font-bold">
                    {currentItems.filter(item => item.status === 'active').length}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <div className="mb-6">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            {activeCategory === 'vehicles' ? 'Ajouter un véhicule' : 'Ajouter une propriété'}
          </Button>
        </div>

        {/* Liste des annonces */}
        <Card>
          <CardHeader>
            <CardTitle>
              Mes {activeCategory === 'vehicles' ? 'véhicules' : 'propriétés'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-lg font-bold text-blue-600">{item.price}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {item.views}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {item.messages}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusText(item.status)}
                    </Badge>
                    <div className="mt-2 space-x-2">
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <MobileBottomNavbar />
    </div>
  );
};

export default SellerDashboard;
