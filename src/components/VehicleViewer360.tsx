
import { useState, useEffect, useRef } from 'react';
import { Car } from 'lucide-react';

interface VehicleViewer360Props {
  vehicleId: string;
}

const VehicleViewer360 = ({ vehicleId }: VehicleViewer360Props) => {
  const [loading, setLoading] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Pour une démo, utilisons 24 images pour simuler une vue 360°
  // Dans une app réelle, ces URLs proviendraient d'une API
  const totalFrames = 24;
  
  // Créer des URLs simulées pour chaque frame
  const frames = Array.from({ length: totalFrames }, (_, i) => 
    `https://images.unsplash.com/photo-1542362567-b07e54358753?frame=${i}`
  );

  useEffect(() => {
    // Simuler le chargement des images
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [vehicleId]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleDrag(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleDrag(e.touches[0].clientX);
  };

  const handleDrag = (clientX: number) => {
    const deltaX = clientX - startX;
    
    if (Math.abs(deltaX) > 10) {
      // Calculer la nouvelle frame en fonction du mouvement horizontal
      const frameStep = Math.floor(Math.abs(deltaX) / 20);
      
      if (frameStep > 0) {
        setCurrentFrame((prev) => {
          // Déterminer la direction (positive ou négative)
          const direction = deltaX > 0 ? 1 : -1;
          let newFrame = (prev + direction * frameStep) % totalFrames;
          
          // Assurer que newFrame est toujours positif
          if (newFrame < 0) newFrame = totalFrames + newFrame;
          
          return newFrame;
        });
        
        setStartX(clientX);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    // Ajout des event listeners pour capturer les événements même en dehors du composant
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Animation automatique quand l'utilisateur ne fait rien
  useEffect(() => {
    if (!isDragging) {
      const autoRotate = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % totalFrames);
      }, 150);
      
      return () => clearInterval(autoRotate);
    }
  }, [isDragging, totalFrames]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-100 rounded-lg select-none">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto bg-autovista-teal/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Car className="h-8 w-8 text-autovista-teal animate-pulse" />
            </div>
            <p className="text-sm text-autovista-dark-gray">
              Chargement de la vue 360°...
            </p>
          </div>
        </div>
      ) : (
        <div 
          ref={containerRef}
          className="h-full w-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Overlay d'instructions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-50 transition-opacity duration-300 hover:opacity-0">
            <div className="text-center bg-black/50 px-4 py-3 rounded-lg text-white">
              <p>Faites glisser pour faire tourner le véhicule</p>
            </div>
          </div>
          
          {/* Simulation de la voiture en 3D */}
          <div className="h-full w-full relative flex items-center justify-center">
            <div 
              className="w-3/4 h-auto relative transform-gpu"
              style={{ 
                backgroundImage: `url(https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `rotateY(${currentFrame * (360 / totalFrames)}deg)`,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }}
            >
              <div className="aspect-[16/9] w-full"></div>
              
              {/* Indicateur de progression circulaire */}
              <div className="absolute bottom-4 right-4 bg-black/60 rounded-full p-2">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="none"
                    stroke="#ffffff33"
                    strokeWidth="2"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray={`${2 * Math.PI * 14}`}
                    strokeDashoffset={2 * Math.PI * 14 * (1 - currentFrame / totalFrames)}
                    transform="rotate(-90 16 16)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleViewer360;
