import { useEffect, useRef, useState } from 'react';
import { Viewer } from 'photo-sphere-viewer';
import { Maximize, Minimize } from 'lucide-react';

interface PanoramaViewerProps {
  imageUrl?: string;
  className?: string;
  autoFullscreen?: boolean;
}

const PanoramaViewer = ({ 
  imageUrl = '/lovable-uploads/0e33164b-9b6f-4d61-aad1-660c30ff1c0b.png',
  className = '',
  autoFullscreen = false
}: PanoramaViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(autoFullscreen);

  useEffect(() => {
    if (autoFullscreen) {
      setIsFullscreen(true);
    }
  }, [autoFullscreen]);

  useEffect(() => {
    if (!containerRef.current) return;

    if (viewerRef.current) {
      viewerRef.current.destroy();
      viewerRef.current = null;
    }

    try {
      const viewer = new Viewer({
        container: containerRef.current,
        panorama: imageUrl,
        defaultZoomLvl: 0,
        minFov: 30,
        maxFov: 90,
        mousewheelCtrlKey: false,
        navbar: [
          'autorotate',
          'zoom',
        ],
        autorotateDelay: 3000,
        autorotateSpeed: '0.5rpm',
        moveSpeed: 1.0,
        zoomSpeed: 1.0,
      });

      viewerRef.current = viewer;

      viewer.once('ready', () => {
        console.log('Panorama viewer ready');
      });

    } catch (error) {
      console.error('Erreur lors de l\'initialisation du viewer panoramique:', error);
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [imageUrl]);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <div className={`w-full h-full relative ${className}`}>
        {/* Instructions très compactes */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 px-2 py-1 rounded text-white text-xs z-10 pointer-events-none">
          <span className="hidden sm:inline">🖱️ Glissez • 🔍 Molette • ↻ Auto</span>
          <span className="sm:hidden">👆 Glissez • Pincez</span>
        </div>
        
        {/* Icône plein écran */}
        <button
          onClick={handleFullscreen}
          className="absolute top-2 right-2 z-20 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-lg transition-colors"
          title={isFullscreen ? "Mode normal" : "Mode plein écran"}
        >
          <Maximize className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
        
        <div 
          ref={containerRef}
          className="w-full h-full overflow-hidden"
          style={{ 
            background: 'linear-gradient(45deg, #1f2937 25%, #374151 25%, #374151 50%, #1f2937 50%, #1f2937 75%, #374151 75%)',
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Mode plein écran automatique */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Bouton de fermeture */}
          <button
            onClick={handleCloseFullscreen}
            className="absolute top-4 right-4 z-60 bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-colors"
            title="Fermer le mode plein écran"
          >
            <Minimize className="h-6 w-6" />
          </button>
          
          {/* Container plein écran adaptatif */}
          <div className="w-full h-full flex items-center justify-center p-0">
            <div 
              className="w-full h-full"
              style={{
                aspectRatio: window.innerWidth < 768 ? '9/16' : '16/9'
              }}
            >
              <img
                src={imageUrl}
                alt="Vue panoramique 360°"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Instructions en mode plein écran */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
            <span className="hidden sm:inline">Appuyez sur Échap ou cliquez sur l'icône pour quitter</span>
            <span className="sm:hidden">Touchez l'icône pour quitter</span>
          </div>
        </div>
      )}
    </>
  );
};

export default PanoramaViewer;
