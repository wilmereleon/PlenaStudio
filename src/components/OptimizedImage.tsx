import { FunctionComponent, useState } from "react";

/**
 * OptimizedImage Component Props
 * 
 * Componente para imágenes optimizadas con srcset y lazy loading
 */
export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

/**
 * OptimizedImage
 * 
 * Componente que maneja imágenes responsivas con srcset automático
 * Genera variantes de resolución basadas en la imagen base
 * 
 * @component
 * 
 * @param {OptimizedImageProps} props - Propiedades del componente
 * @returns {JSX.Element} Imagen optimizada con srcset
 */
const OptimizedImage: FunctionComponent<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  sizes = "(max-width: 576px) 300px, (max-width: 768px) 400px, (max-width: 1024px) 600px, 800px",
  width,
  height,
  style,
  onClick
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  /**
   * Genera el srcset basado en la imagen fuente
   * Crea variantes para diferentes densidades de píxeles
   */
  const generateSrcSet = (imageSrc: string): string => {
    const baseUrl = imageSrc.replace(/(@2x)?(\.[^.]+)$/, '');
    const extension = imageSrc.match(/\.[^.]+$/)?.[0] || '.png';
    
    // Para imágenes @2x existentes, creamos variantes
    if (imageSrc.includes('@2x')) {
      const base = imageSrc.replace('@2x', '');
      return `${base} 1x, ${imageSrc} 2x`;
    }
    
    // Para imágenes regulares, asumimos que pueden tener variantes
    return `${baseUrl}${extension} 1x, ${baseUrl}@2x${extension} 2x`;
  };

  /**
   * Genera variantes de tamaño para responsive
   */
  const generateResponsiveSrcSet = (imageSrc: string): string => {
    const baseUrl = imageSrc.replace(/(@2x)?(\.[^.]+)$/, '');
    const extension = imageSrc.match(/\.[^.]+$/)?.[0] || '.png';
    
    // Para imágenes críticas como hero images
    if (imageSrc.includes('video-container') || imageSrc.includes('device')) {
      return [
        `${baseUrl}-small${extension} 320w`,
        `${baseUrl}-medium${extension} 768w`,
        `${baseUrl}-large${extension} 1024w`,
        `${imageSrc} 1440w`
      ].join(', ');
    }
    
    // Para imágenes de productos
    if (imageSrc.includes('InsumosIMG/') || imageSrc.includes('earring') || imageSrc.includes('ring')) {
      return [
        `${baseUrl}-thumb${extension} 150w`,
        `${baseUrl}-medium${extension} 300w`,
        `${imageSrc} 600w`
      ].join(', ');
    }
    
    // Default: usar densidad de píxeles
    return generateSrcSet(imageSrc);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Fallback para errores de carga
  if (imageError) {
    return (
      <div 
        className={`${className} bg-light d-flex align-items-center justify-content-center`}
        style={{
          width: width || 'auto',
          height: height || 200,
          backgroundColor: '#f8f9fa',
          color: '#6c757d',
          fontSize: '14px',
          ...style
        }}
      >
        <span>Imagen no disponible</span>
      </div>
    );
  }

  return (
    <div className="position-relative">
      {/* Placeholder mientras carga */}
      {!imageLoaded && loading === "lazy" && (
        <div 
          className="position-absolute w-100 h-100 bg-light d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: '#f8f9fa',
            color: '#6c757d',
            fontSize: '12px'
          }}
        >
          Cargando...
        </div>
      )}
      
      <img
        src={src}
        srcSet={generateResponsiveSrcSet(src)}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        style={{
          ...style,
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
        onError={handleImageError}
        onLoad={handleImageLoad}
        onClick={onClick}
      />
    </div>
  );
};

export default OptimizedImage;