
import { useEffect, useRef } from 'react';
import { Viewer } from 'photo-sphere-viewer';

interface PanoramaViewerProps {
  imageUrl?: string;
  className?: string;
}

const PanoramaViewer = ({ 
  imageUrl = '/lovable-uploads/95c880d0-3c75-445f-bc7d-1a697ad98dc1.png',
  className = ''
}: PanoramaViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Nettoyer l'ancien viewer s'il existe
    if (viewerRef.current) {
      viewerRef.current.destroy();
      viewerRef.current = null;
    }

    // Créer le nouveau viewer
    try {
      const viewer = new Viewer({
        container: containerRef.current,
        panorama: imageUrl,
        // Configuration pour une expérience optimale
        defaultZoomLvl: 0,
        minFov: 30,
        maxFov: 90,
        mousewheelCtrlKey: false,
        // Interface utilisateur
        navbar: [
          'autorotate',
          'zoom',
          'fullscreen',
        ],
        // Animation automatique au démarrage
        autorotateDelay: 2000,
        autorotateSpeed: '1rpm',
        // Configuration des contrôles
        moveSpeed: 1.0,
        zoomSpeed: 1.0,
      });

      viewerRef.current = viewer;

      // Gérer les événements du viewer avec la bonne API
      viewer.once('ready', () => {
        console.log('Panorama viewer ready');
      });

    } catch (error) {
      console.error('Erreur lors de l\'initialisation du viewer panoramique:', error);
    }

    // Cleanup function
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [imageUrl]);

  return (
    <div className={`w-full h-full ${className}`}>
      {/* Instructions simplifiées pour mobile */}
      <div className="mb-1 text-xs text-gray-500 text-center px-2 sm:mb-2">
        <span className="hidden sm:inline">🖱️ Cliquez et faites glisser • 🔍 Molette pour zoomer • ↻ Rotation auto</span>
        <span className="sm:hidden">👆 Glissez • Pincez pour zoomer</span>
      </div>
      
      {/* Conteneur du viewer - prend toute la hauteur disponible */}
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
  );
};

export default PanoramaViewer;
