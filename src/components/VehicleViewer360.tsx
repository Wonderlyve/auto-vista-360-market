
import { useState, useEffect, useRef } from 'react';
import { Car } from 'lucide-react';

interface VehicleViewer360Props {
  vehicleId: string;
}

const VehicleViewer360 = ({ vehicleId }: VehicleViewer360Props) => {
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Use the uploaded 360° spherical image
  const sphericalImageUrl = '/lovable-uploads/95c880d0-3c75-445f-bc7d-1a697ad98dc1.png';

  useEffect(() => {
    // Simulate loading time for the 360° image
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [vehicleId]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleDrag(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleDrag(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleDrag = (clientX: number, clientY: number) => {
    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    
    setRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }));
    
    setStartPos({ x: clientX, y: clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-900 rounded-lg select-none">
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
        <div 
          ref={containerRef}
          className="h-full w-full cursor-grab active:cursor-grabbing perspective-1000"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Instructions overlay */}
          <div className="absolute top-4 left-4 bg-black/60 px-3 py-2 rounded-lg text-white text-sm z-10 transition-opacity duration-300 hover:opacity-70">
            <p>🔄 Faites glisser pour explorer l'intérieur</p>
          </div>
          
          {/* 360° Spherical image viewer */}
          <div 
            className="w-full h-full relative overflow-hidden"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
          >
            {/* Spherical projection simulation */}
            <div className="absolute inset-0 transform-gpu">
              <img
                ref={imageRef}
                src={sphericalImageUrl}
                alt="Vue 360° de l'intérieur du véhicule"
                className="w-full h-full object-cover"
                style={{
                  transform: `scale(1.2)`,
                  filter: 'contrast(1.1) saturate(1.1)'
                }}
                draggable={false}
              />
              
              {/* Spherical mapping overlay */}
              <div 
                className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"
                style={{
                  background: `radial-gradient(circle at center, transparent 0%, transparent 60%, rgba(0,0,0,0.1) 100%)`
                }}
              />
            </div>
          </div>
          
          {/* Control indicators */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            {/* Rotation indicator */}
            <div className="bg-black/60 rounded-full p-2 text-white text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                <span>{Math.round(rotation.y)}°</span>
              </div>
            </div>
            
            {/* Reset button */}
            <button
              onClick={() => setRotation({ x: 0, y: 0 })}
              className="bg-autovista-teal hover:bg-autovista-blue text-white px-3 py-1 rounded-full text-xs transition-colors"
            >
              Reset
            </button>
          </div>
          
          {/* Navigation hints */}
          <div className="absolute bottom-4 left-4 bg-black/60 rounded-lg p-2 text-white text-xs">
            <div className="flex items-center gap-2">
              <span>🖱️ Souris</span>
              <span>📱 Tactile</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleViewer360;
