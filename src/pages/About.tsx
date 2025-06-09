
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Car, Users, Shield, Award, Home } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-autovista-light-gray">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-autovista-blue mb-4">À propos de Vista360</h1>
          <p className="text-xl text-autovista-dark-gray max-w-3xl mx-auto">
            Vista360 révolutionne l'achat et la vente de véhicules et de biens immobiliers grâce à la technologie de visite virtuelle 360°, 
            offrant une expérience immersive et transparente pour tous.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-autovista-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="h-8 w-8 text-autovista-teal" />
            </div>
            <h3 className="font-semibold mb-2">Automobiles 360°</h3>
            <p className="text-sm text-autovista-dark-gray">
              Explorez chaque véhicule sous tous les angles avec notre technologie de visite virtuelle.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-autovista-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="h-8 w-8 text-autovista-blue" />
            </div>
            <h3 className="font-semibold mb-2">Immobilier 360°</h3>
            <p className="text-sm text-autovista-dark-gray">
              Visitez maisons, appartements et propriétés comme si vous y étiez.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-autovista-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-autovista-teal" />
            </div>
            <h3 className="font-semibold mb-2">Multi-vendeurs</h3>
            <p className="text-sm text-autovista-dark-gray">
              Plateforme ouverte aux professionnels et particuliers pour vendre leurs biens.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-autovista-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-autovista-blue" />
            </div>
            <h3 className="font-semibold mb-2">Sécurisé</h3>
            <p className="text-sm text-autovista-dark-gray">
              Transactions sécurisées et vérification des vendeurs pour votre tranquillité d'esprit.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-autovista-blue mb-6 text-center">Notre Mission</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-autovista-dark-gray mb-4">
                Chez Vista360, nous croyons que l'achat d'un véhicule ou d'un bien immobilier devrait être une expérience transparente, 
                informée et sans stress. C'est pourquoi nous avons développé la première plateforme intégrant la technologie de visite virtuelle 360°.
              </p>
              <p className="text-autovista-dark-gray mb-4">
                Notre objectif est de permettre aux acheteurs d'examiner minutieusement chaque bien 
                depuis le confort de leur domicile, tout en offrant aux vendeurs une vitrine moderne 
                et efficace pour présenter leurs biens.
              </p>
            </div>
            <div className="bg-autovista-light-gray p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Nos Valeurs</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-autovista-teal rounded-full mr-3"></div>
                  Transparence totale
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-autovista-teal rounded-full mr-3"></div>
                  Innovation technologique
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-autovista-teal rounded-full mr-3"></div>
                  Service client exceptionnel
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-autovista-teal rounded-full mr-3"></div>
                  Confiance et sécurité
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-autovista-teal text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Rejoignez la révolution Vista360</h2>
          <p className="mb-6">
            Découvrez une nouvelle façon d'acheter et de vendre véhicules et biens immobiliers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary">
              <a href="/vehicules">Véhicules</a>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-autovista-teal">
              <a href="/properties">Immobilier</a>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-autovista-teal">
              <a href="/vendre">Vendre</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
