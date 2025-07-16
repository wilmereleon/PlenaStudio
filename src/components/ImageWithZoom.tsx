// 🔍 PLENA STUDIO - COMPONENTE DE IMAGEN CON LUPA
// Componente para mostrar imágenes con zoom y lupa premium

import React, { useState, useRef, useEffect } from 'react';
import './ImageWithZoom.css';

interface ImageWithZoomProps {
  src: string;
  alt: string;
  className?: string;
  zoomLevel?: number;
}

const ImageWithZoom: React.FC<ImageWithZoomProps> = ({ 
  src, 
  alt, 
  className = '', 
  zoomLevel = 2 
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div 
      ref={containerRef}
      className={`image-zoom-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: isZoomed ? 'zoom-out' : 'zoom-in',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-medium)',
        transition: 'all 0.3s ease'
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
          transform: isZoomed ? `scale(${zoomLevel})` : 'scale(1)',
          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
        }}
      />
      
      {/* Overlay con efecto de lupa */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isZoomed 
            ? 'linear-gradient(45deg, rgba(212, 175, 55, 0.1), rgba(15, 81, 50, 0.1))'
            : 'transparent',
          transition: 'background 0.3s ease',
          pointerEvents: 'none'
        }}
      />
      
      {/* Indicador de zoom */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '6px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          opacity: isZoomed ? 1 : 0.7,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}
      >
        🔍 {isZoomed ? 'Ampliado' : 'Hover para ampliar'}
      </div>

      {/* Loading indicator */}
      {!imageLoaded && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'var(--color-jewel-gold)',
            fontSize: '24px'
          }}
        >
          📸 Cargando...
        </div>
      )}
    </div>
  );
};

export default ImageWithZoom;
