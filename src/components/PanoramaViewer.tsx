
import { useEffect, useRef, useState } from 'react';
import { Viewer } from 'photo-sphere-viewer';
import { Maximize, Minimize } from 'lucide-react';

interface PanoramaViewerProps {
  imageUrl?: string;
  className?: string;
}

const PanoramaViewer = ({ 
  imageUrl = '/lovable-uploads/0e33164b-9b6f-4d61-aad1-660c30ff1c0b.png',
  className = ''
}: PanoramaViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
        autorotateDelay: 2000,
        autorotateSpeed: '1rpm',
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

  return (
    <>
      <div className={`w-full h-full relative ${className}`}>
        {/* Instructions très compactes pour mobile */}
        <div className="mb-1 text-xs text-gray-500 text-center px-2 sm:mb-2">
          <span className="hidden sm:inline">🖱️ Cliquez et faites glisser • 🔍 Molette pour zoomer • ↻ Rotation auto</span>
          <span className="sm:hidden">👆 Glissez • Pincez pour zoomer</span>
        </div>
        
        {/* Icône plein écran */}
        <button
          onClick={handleFullscreen}
          className="absolute top-2 right-2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors"
          title={isFullscreen ? "Mode normal" : "Mode plein écran"}
        >
          <Maximize className="h-4 w-4" />
        </button>
        
        <div 
          ref={containerRef}
          className="w-full h-full rounded-lg overflow-hidden shadow-lg border border-gray-200"
          style={{ 
            background: 'linear-gradient(45deg, #f0f0f0 25%, #e0e0e0 25%, #e0e0e0 50%, #f0f0f0 50%, #f0f0f0 75%, #e0e0e0 75%)',
            backgroundSize: '20px 20px',
            minHeight: '300px'
          }}
        />
      </div>

      {/* Mode plein écran personnalisé */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Bouton de fermeture */}
          <button
            onClick={handleFullscreen}
            className="absolute top-4 right-4 z-60 bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-colors"
            title="Fermer le mode plein écran"
          >
            <Minimize className="h-6 w-6" />
          </button>
          
          {/* Image en plein écran avec ratios adaptatifs */}
          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              src={imageUrl}
              alt="Vue panoramique 360°"
              className="max-w-full max-h-full object-contain rounded-lg"
              style={{
                aspectRatio: window.innerWidth < 768 ? '9/16' : '16/9'
              }}
            />
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
