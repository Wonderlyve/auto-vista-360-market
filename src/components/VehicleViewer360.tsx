
import { useState, useEffect } from 'react';
import { Car } from 'lucide-react';
import PanoramaViewer from './PanoramaViewer';

interface VehicleViewer360Props {
  vehicleId: string;
}

const VehicleViewer360 = ({ vehicleId }: VehicleViewer360Props) => {
  const [loading, setLoading] = useState(true);
  
  const sphericalImageUrl = '/lovable-uploads/0e33164b-9b6f-4d61-aad1-660c30ff1c0b.png';

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [vehicleId]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-900 rounded-lg">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Car className="h-8 w-8 text-blue-600 animate-pulse" />
            </div>
            <p className="text-sm text-white">
              Chargement de la vue 360°...
            </p>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col">
          {/* Instructions compactes pour mobile */}
          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-black/60 px-1 py-0.5 sm:px-2 sm:py-1 rounded text-white text-xs z-10 transition-opacity duration-300 hover:opacity-70">
            <p className="hidden sm:block">🌐 Vue panoramique 360°</p>
            <p className="sm:hidden">🌐 360°</p>
          </div>
          
          <PanoramaViewer 
            imageUrl={sphericalImageUrl}
            className="flex-1"
          />
        </div>
      )}
    </div>
  );
};

export default VehicleViewer360;
