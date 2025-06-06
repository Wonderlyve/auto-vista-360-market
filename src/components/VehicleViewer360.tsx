
import { useState, useEffect } from 'react';
import { Car } from 'lucide-react';
import PanoramaViewer from './PanoramaViewer';

interface VehicleViewer360Props {
  vehicleId: string;
}

const VehicleViewer360 = ({ vehicleId }: VehicleViewer360Props) => {
  const [loading, setLoading] = useState(true);
  
  // Use the uploaded 360° spherical image
  const sphericalImageUrl = '/lovable-uploads/95c880d0-3c75-445f-bc7d-1a697ad98dc1.png';

  useEffect(() => {
    // Simulate loading time for the 360° image
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
            <div className="mx-auto bg-autovista-teal/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Car className="h-8 w-8 text-autovista-teal animate-pulse" />
            </div>
            <p className="text-sm text-white">
              Chargement de la vue 360°...
            </p>
          </div>
        </div>
      ) : (
        <div className="h-full w-full">
          {/* Instructions overlay */}
          <div className="absolute top-4 left-4 bg-black/60 px-3 py-2 rounded-lg text-white text-sm z-10 transition-opacity duration-300 hover:opacity-70">
            <p>🌐 Vue panoramique interactive 360°</p>
          </div>
          
          {/* PanoramaViewer Component */}
          <PanoramaViewer 
            imageUrl={sphericalImageUrl}
            className="h-full"
          />
        </div>
      )}
    </div>
  );
};

export default VehicleViewer360;
