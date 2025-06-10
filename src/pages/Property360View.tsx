
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VehicleViewer360 from '@/components/VehicleViewer360';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Property360View = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        <Button asChild className="bg-white/20 hover:bg-white/30 text-white">
          <Link to={`/property/${id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux détails
          </Link>
        </Button>
        <Button asChild variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
          <Link to="/properties">
            Toutes les propriétés
          </Link>
        </Button>
      </div>
      
      <VehicleViewer360 vehicleId={id!} type="property" />
    </div>
  );
};

export default Property360View;
