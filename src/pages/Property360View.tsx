
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VehicleViewer360 from '@/components/VehicleViewer360';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Property360View = () => {
  const { id } = useParams();

  return (
    <div className="h-screen w-full bg-gray-900 relative overflow-hidden">
      {/* Navigation buttons - positioned for mobile and desktop */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-50 flex flex-col sm:flex-row gap-2">
        <Button asChild className="bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">
          <Link to={`/property/${id}`}>
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Détails
          </Link>
        </Button>
        <Button asChild variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">
          <Link to="/properties">
            Propriétés
          </Link>
        </Button>
      </div>
      
      {/* Viewer container - full height */}
      <div className="w-full h-full">
        <VehicleViewer360 vehicleId={id!} type="property" />
      </div>
    </div>
  );
};

export default Property360View;
