import React from 'react';
import { 
  ButtonPremium, 
  ProductCardPremium, 
  BadgePremium, 
  PriceHighlight, 
  HeroSectionPremium, 
  ProductGridPremium 
} from '../components/ComponentesPremium';
import ImageWithZoom from '../components/ImageWithZoom';
import ProductDetailsModal from '../components/ProductDetailsModal';

/**
 * PremiumShowcase
 * 
 * Página de demostración de componentes premium con paleta de colores de joyería de lujo.
 * Muestra todos los componentes optimizados en un layout funcional.
 * 
 * @component
 * @returns {JSX.Element} Página de demostración completa
 */
const PremiumShowcase: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  // Función para abrir el modal con el producto seleccionado
  const openProductDetails = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Datos de ejemplo para productos
  const sampleProducts = [
    {
      id: '1',
      image: '/InsumosIMG/ring01.jpeg',
      title: 'Anillo de Compromiso Clásico',
      price: '2,500',
      originalPrice: '3,200',
      category: 'Anillos',
      isPremium: true,
      description: 'Elegante anillo de compromiso con diamante central de 1 quilate, engastado en oro blanco de 18k. Diseño clásico con banda lisa que realza la belleza del diamante.',
      features: ['Diamante certificado 1ct', 'Oro blanco 18k', 'Engaste de 6 puntas', 'Pulido espejo', 'Garantía de por vida'],
      materials: ['Oro blanco 18k', 'Diamante natural', 'Rodio'],
      dimensions: '5.5mm x 2.1mm',
      weight: '3.2g',
      gallery: ['/InsumosIMG/ring01.jpeg', '/InsumosIMG/ring02.jpeg', '/InsumosIMG/ring03.jpeg'],
      inStock: true,
      rating: 5,
      reviews: 47
    },
    {
      id: '2',
      image: '/InsumosIMG/womenEarring01.jpeg',
      title: 'Aretes Premium Oro',
      price: '1,800',
      originalPrice: '2,100',
      category: 'Aretes',
      isPremium: false,
      description: 'Aretes sofisticados en oro amarillo con perlas cultivadas de agua dulce. Perfectos para ocasiones especiales y uso diario elegante.',
      features: ['Perlas cultivadas', 'Oro amarillo 14k', 'Cierre de presión', 'Diseño atemporal', 'Caja de regalo incluida'],
      materials: ['Oro amarillo 14k', 'Perlas cultivadas', 'Silicona hipoalergénica'],
      dimensions: '12mm x 8mm',
      weight: '2.1g',
      gallery: ['/InsumosIMG/womenEarring01.jpeg', '/InsumosIMG/womenEarring02.jpeg', '/InsumosIMG/womenEarring03.jpeg'],
      inStock: true,
      rating: 4,
      reviews: 23
    },
    {
      id: '3',
      image: '/InsumosIMG/ring02.jpeg',
      title: 'Anillo Diamante Premium',
      price: '4,800',
      originalPrice: '5,500',
      category: 'Anillos',
      isPremium: true,
      description: 'Anillo de lujo con diamante principal de 2 quilates rodeado de diamantes más pequeños. Diseño halo que maximiza el brillo y la presencia.',
      features: ['Diamante central 2ct', 'Halo de diamantes', 'Oro blanco 18k', 'Certificado GIA', 'Diseño exclusivo'],
      materials: ['Oro blanco 18k', 'Diamantes naturales', 'Platino'],
      dimensions: '8.2mm x 3.5mm',
      weight: '5.8g',
      gallery: ['/InsumosIMG/ring02.jpeg', '/InsumosIMG/ring03.jpeg', '/InsumosIMG/ring01.jpeg'],
      inStock: true,
      rating: 5,
      reviews: 89
    },
    {
      id: '4',
      image: '/InsumosIMG/womenEarring02.jpeg',
      title: 'Bufandas de Lujo',
      price: '3,200',
      originalPrice: '3,800',
      category: 'Bufandas',
      isPremium: false,
      description: 'Bufandas premium elaboradas con materiales excepcionales y diseños únicos. Cada pieza combina técnicas artesanales tradicionales con patrones contemporáneos, creando accesorios versátiles que elevan cualquier outfit.',
      features: ['Materiales premium', 'Diseños únicos', 'Técnicas artesanales', 'Patrones contemporáneos', 'Versátiles y elegantes'],
      materials: ['Seda natural', 'Algodón orgánico', 'Fibras sintéticas premium'],
      dimensions: '180cm x 70cm',
      weight: '150g',
      gallery: ['/InsumosIMG/womenEarring02.jpeg', '/InsumosIMG/womenEarring04.jpeg', '/InsumosIMG/womenEarring05.jpeg'],
      inStock: true,
      rating: 4,
      reviews: 34
    },
    {
      id: '5',
      image: '/InsumosIMG/ring03.jpeg',
      title: 'Anillo Vintage Oro',
      price: '2,800',
      originalPrice: '3,200',
      category: 'Anillos',
      isPremium: true,
      description: 'Anillo de estilo vintage con detalles grabados a mano. Inspirado en diseños art déco con un toque contemporáneo.',
      features: ['Grabado artesanal', 'Oro amarillo 18k', 'Diseño vintage', 'Acabado mate', 'Edición limitada'],
      materials: ['Oro amarillo 18k', 'Plata 925', 'Técnica millgrain'],
      dimensions: '6.8mm x 2.8mm',
      weight: '4.2g',
      gallery: ['/InsumosIMG/ring03.jpeg', '/InsumosIMG/ring01.jpeg', '/InsumosIMG/ring02.jpeg'],
      inStock: true,
      rating: 5,
      reviews: 56
    },
    {
      id: '6',
      image: '/InsumosIMG/womenEarring03.jpeg',
      title: 'Aretes Cristal Premium',
      price: '2,200',
      originalPrice: '2,500',
      category: 'Aretes',
      isPremium: false,
      description: 'Aretes contemporáneos con cristales Swarovski y detalles en oro blanco. Perfectos para eventos especiales.',
      features: ['Cristales Swarovski', 'Oro blanco 14k', 'Diseño moderno', 'Brillo excepcional', 'Hipoalergénicos'],
      materials: ['Oro blanco 14k', 'Cristales Swarovski', 'Níquel libre'],
      dimensions: '15mm x 7mm',
      weight: '2.5g',
      gallery: ['/InsumosIMG/womenEarring03.jpeg', '/InsumosIMG/womenEarring01.jpeg', '/InsumosIMG/womenEarring05.jpeg'],
      inStock: true,
      rating: 4,
      reviews: 67
    },
    {
      id: '7',
      image: '/InsumosIMG/womenEarring04.jpeg',
      title: 'Aretes Elegance',
      price: '2,100',
      originalPrice: '2,500',
      category: 'Aretes',
      isPremium: false,
      description: 'Aretes de línea elegante con diseño minimalista. Perfectos para uso diario o ocasiones especiales.',
      features: ['Diseño minimalista', 'Oro rose 14k', 'Cierre seguro', 'Peso ligero', 'Versatilidad'],
      materials: ['Oro rose 14k', 'Acero inoxidable', 'Silicona'],
      dimensions: '18mm x 4mm',
      weight: '1.6g',
      gallery: ['/InsumosIMG/womenEarring04.jpeg', '/InsumosIMG/womenEarring02.jpeg', '/InsumosIMG/womenEarring03.jpeg'],
      inStock: true,
      rating: 4,
      reviews: 29
    },
    {
      id: '8',
      image: '/InsumosIMG/womenEarring05.jpeg',
      title: 'Aretes Luxury Gold',
      price: '3,800',
      originalPrice: '4,200',
      category: 'Aretes',
      isPremium: true,
      description: 'Aretes de lujo con diamantes y oro amarillo. Diseño exclusivo para clientas exigentes.',
      features: ['Diamantes naturales', 'Oro amarillo 18k', 'Diseño exclusivo', 'Certificado GIA', 'Caja premium'],
      materials: ['Oro amarillo 18k', 'Diamantes naturales', 'Platino'],
      dimensions: '20mm x 12mm',
      weight: '3.8g',
      gallery: ['/InsumosIMG/womenEarring05.jpeg', '/InsumosIMG/womenEarring01.jpeg', '/InsumosIMG/womenEarring04.jpeg'],
      inStock: true,
      rating: 5,
      reviews: 93
    },
  ];

  const handleAddToCart = (productId: string) => {
    console.log(`Agregando producto ${productId} al carrito`);
    alert(`Producto ${productId} agregado al carrito`);
  };

  const handleViewDetails = (productId: string) => {
    const product = sampleProducts.find(p => p.id === productId);
    if (product) {
      openProductDetails(product);
    }
  };

  const handleHeroCTA = () => {
    console.log('CTA del hero clickeado');
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ 
      background: 'var(--color-pearl-white)', 
      minHeight: '100vh',
      fontFamily: 'var(--font-secondary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ilustraciones de fondo decorativas */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.08
      }}>
        {/* Elementos decorativos inspirados en la imagen */}
        <svg style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          transform: 'rotate(-15deg)'
        }}>
          <defs>
            <linearGradient id="plantGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#228B22" />
              <stop offset="100%" stopColor="#006400" />
            </linearGradient>
          </defs>
          <circle cx="75" cy="75" r="60" fill="url(#plantGradient)" opacity="0.3" />
          <path d="M75 15 Q45 45 75 75 Q105 45 75 15" fill="#87CEEB" opacity="0.5" />
          <path d="M75 135 Q45 105 75 75 Q105 105 75 135" fill="#87CEEB" opacity="0.5" />
          <circle cx="75" cy="75" r="8" fill="#9ACD32" />
        </svg>

        <svg style={{
          position: 'absolute',
          top: '60%',
          right: '8%',
          width: '120px',
          height: '120px',
          transform: 'rotate(25deg)'
        }}>
          <rect x="10" y="10" width="100" height="100" fill="#E6E6FA" opacity="0.4" rx="15" />
          <rect x="20" y="20" width="80" height="80" fill="#87CEEB" opacity="0.3" rx="10" />
          <circle cx="60" cy="60" r="25" fill="#9ACD32" opacity="0.5" />
          <circle cx="60" cy="60" r="10" fill="#006400" opacity="0.6" />
        </svg>

        <svg style={{
          position: 'absolute',
          top: '30%',
          right: '20%',
          width: '100px',
          height: '100px',
          transform: 'rotate(-30deg)'
        }}>
          <path d="M50 10 L20 40 L50 70 L80 40 Z" fill="#F5F5DC" stroke="#228B22" strokeWidth="2" opacity="0.4" />
          <path d="M50 20 L30 40 L50 60 L70 40 Z" fill="#87CEEB" opacity="0.3" />
          <circle cx="50" cy="40" r="8" fill="#9ACD32" />
        </svg>

        <svg style={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          width: '80px',
          height: '80px',
          transform: 'rotate(45deg)'
        }}>
          <polygon points="40,10 60,30 40,50 20,30" fill="#E6E6FA" opacity="0.4" />
          <polygon points="40,15 55,30 40,45 25,30" fill="#87CEEB" opacity="0.3" />
          <circle cx="40" cy="30" r="5" fill="#228B22" />
        </svg>

        <svg style={{
          position: 'absolute',
          top: '80%',
          right: '30%',
          width: '110px',
          height: '110px',
          transform: 'rotate(-20deg)'
        }}>
          <ellipse cx="55" cy="55" rx="45" ry="30" fill="#F5F5DC" opacity="0.3" />
          <ellipse cx="55" cy="55" rx="30" ry="20" fill="#87CEEB" opacity="0.4" />
          <path d="M25 55 Q55 25 85 55 Q55 85 25 55" fill="#9ACD32" opacity="0.3" />
          <circle cx="55" cy="55" r="8" fill="#006400" opacity="0.6" />
        </svg>

        <svg style={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          width: '90px',
          height: '90px',
          transform: 'rotate(60deg)'
        }}>
          <path d="M45 5 L75 35 L45 65 L15 35 Z" fill="#E6E6FA" opacity="0.3" />
          <path d="M45 15 L65 35 L45 55 L25 35 Z" fill="#87CEEB" opacity="0.4" />
          <circle cx="45" cy="35" r="10" fill="#9ACD32" opacity="0.5" />
          <circle cx="45" cy="35" r="4" fill="#228B22" />
        </svg>

        <svg style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '70px',
          height: '70px',
          transform: 'rotate(-45deg)'
        }}>
          <rect x="10" y="10" width="50" height="50" fill="#F5F5DC" opacity="0.3" rx="8" />
          <rect x="15" y="15" width="40" height="40" fill="#87CEEB" opacity="0.4" rx="5" />
          <circle cx="35" cy="35" r="12" fill="#9ACD32" opacity="0.4" />
          <circle cx="35" cy="35" r="6" fill="#006400" />
        </svg>

        <svg style={{
          position: 'absolute',
          bottom: '40%',
          left: '25%',
          width: '95px',
          height: '95px',
          transform: 'rotate(20deg)'
        }}>
          <path d="M47.5 5 Q70 25 47.5 47.5 Q25 70 2.5 47.5 Q25 25 47.5 5" fill="#E6E6FA" opacity="0.3" />
          <path d="M47.5 15 Q60 25 47.5 37.5 Q35 50 22.5 37.5 Q35 25 47.5 15" fill="#87CEEB" opacity="0.4" />
          <circle cx="47.5" cy="37.5" r="8" fill="#9ACD32" opacity="0.5" />
        </svg>

        <svg style={{
          position: 'absolute',
          top: '45%',
          left: '2%',
          width: '60px',
          height: '60px',
          transform: 'rotate(-60deg)'
        }}>
          <circle cx="30" cy="30" r="25" fill="#F5F5DC" opacity="0.3" />
          <circle cx="30" cy="30" r="18" fill="#87CEEB" opacity="0.4" />
          <circle cx="30" cy="30" r="10" fill="#9ACD32" opacity="0.5" />
          <circle cx="30" cy="30" r="4" fill="#228B22" />
        </svg>

        {/* Elementos de herramientas artísticas */}
        <svg style={{
          position: 'absolute',
          top: '25%',
          left: '40%',
          width: '40px',
          height: '40px',
          transform: 'rotate(30deg)'
        }}>
          <rect x="5" y="15" width="30" height="4" fill="#87CEEB" opacity="0.4" rx="2" />
          <rect x="15" y="5" width="4" height="30" fill="#9ACD32" opacity="0.4" rx="2" />
          <circle cx="20" cy="20" r="3" fill="#006400" />
        </svg>

        <svg style={{
          position: 'absolute',
          bottom: '60%',
          right: '40%',
          width: '35px',
          height: '35px',
          transform: 'rotate(-40deg)'
        }}>
          <path d="M5 5 L30 10 L25 30 L10 25 Z" fill="#E6E6FA" opacity="0.4" />
          <path d="M10 10 L25 13 L22 25 L13 22 Z" fill="#87CEEB" opacity="0.3" />
          <circle cx="17.5" cy="17.5" r="3" fill="#9ACD32" />
        </svg>
      </div>
      {/* Hero Section Premium */}
      <HeroSectionPremium
        title="Joyería de Lujo Exclusiva"
        subtitle="Plena Premium"
        description="Descubre nuestra colección premium de joyería artesanal. Cada pieza está cuidadosamente diseñada para reflejar elegancia y sofisticación."
        ctaText="Explorar Colección"
        onCtaClick={handleHeroCTA}
        backgroundImage="/build/InsumosIMG/hero-jewelry-bg.jpg"
      />

      {/* Sección de Demostración de Componentes */}
      <section style={{ 
        padding: 'var(--spacing-section) var(--spacing-md)',
        background: 'var(--color-soft-cream)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: 'var(--font-size-h2)', 
            color: 'var(--color-deep-emerald)', 
            marginBottom: 'var(--spacing-2xl)',
            fontFamily: 'var(--font-primary)'
          }}>
            Componentes Premium
          </h2>

          {/* Demostración de Botones */}
          <div style={{ 
            marginBottom: 'var(--spacing-3xl)',
            padding: 'var(--spacing-xl)',
            background: 'var(--color-pearl-white)',
            borderRadius: 'var(--border-radius-large)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h3 style={{ 
              fontSize: 'var(--font-size-h3)', 
              color: 'var(--color-charcoal)', 
              marginBottom: 'var(--spacing-xl)',
              fontFamily: 'var(--font-primary)'
            }}>
              Botones Premium
            </h3>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 'var(--spacing-lg)',
              alignItems: 'center'
            }}>
              <ButtonPremium variant="primary" size="large">
                Botón Primario
              </ButtonPremium>
              <ButtonPremium variant="secondary" size="medium">
                Botón Secundario
              </ButtonPremium>
              <ButtonPremium variant="outline" size="small">
                Botón Outline
              </ButtonPremium>
              <ButtonPremium variant="premium" size="large">
                Botón Premium
              </ButtonPremium>
            </div>
          </div>

          {/* Demostración de Badges */}
          <div style={{ 
            marginBottom: 'var(--spacing-3xl)',
            padding: 'var(--spacing-xl)',
            background: 'var(--color-pearl-white)',
            borderRadius: 'var(--border-radius-large)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h3 style={{ 
              fontSize: 'var(--font-size-h3)', 
              color: 'var(--color-charcoal)', 
              marginBottom: 'var(--spacing-xl)',
              fontFamily: 'var(--font-primary)'
            }}>
              Badges Premium
            </h3>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 'var(--spacing-lg)',
              alignItems: 'center'
            }}>
              <BadgePremium variant="premium" size="large">Exclusivo</BadgePremium>
              <BadgePremium variant="new" size="medium">Nuevo</BadgePremium>
              <BadgePremium variant="sale" size="small">Oferta</BadgePremium>
              <BadgePremium variant="bestseller" size="medium">Más Vendido</BadgePremium>
            </div>
          </div>

          {/* Demostración de Precios */}
          <div style={{ 
            marginBottom: 'var(--spacing-3xl)',
            padding: 'var(--spacing-xl)',
            background: 'var(--color-pearl-white)',
            borderRadius: 'var(--border-radius-large)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h3 style={{ 
              fontSize: 'var(--font-size-h3)', 
              color: 'var(--color-charcoal)', 
              marginBottom: 'var(--spacing-xl)',
              fontFamily: 'var(--font-primary)'
            }}>
              Precios Destacados
            </h3>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 'var(--spacing-2xl)',
              alignItems: 'center'
            }}>
              <PriceHighlight price="2,500" originalPrice="3,200" size="large" />
              <PriceHighlight price="1,800" size="medium" />
              <PriceHighlight price="599" originalPrice="799" size="small" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Galería Premium con Lupa */}
      <section style={{ 
        background: 'var(--color-mint-green)', 
        padding: 'var(--spacing-section) var(--spacing-md)',
        borderTop: '2px solid var(--color-jewel-gold)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: 'var(--font-size-h2)', 
            color: 'var(--color-deep-emerald)', 
            marginBottom: 'var(--spacing-lg)',
            fontFamily: 'var(--font-primary)'
          }}>
            🔍 Galería Premium con Lupa
          </h2>
          <p style={{ 
            fontSize: 'var(--font-size-lg)', 
            color: 'var(--color-charcoal)', 
            marginBottom: 'var(--spacing-2xl)',
            maxWidth: '600px',
            margin: '0 auto var(--spacing-2xl)'
          }}>
            Explora nuestras joyas con detalle premium. Pasa el cursor sobre las imágenes para ver cada pieza con zoom de alta calidad.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--spacing-xl)',
            marginBottom: 'var(--spacing-2xl)'
          }}>
            {sampleProducts.slice(0, 6).map((product) => (
              <div key={product.id} style={{
                background: 'white',
                borderRadius: 'var(--border-radius-large)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-elevated)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-elevated)';
              }}
              >
                <div style={{ height: '250px', position: 'relative' }}>
                  <ImageWithZoom 
                    src={product.image}
                    alt={product.title}
                    zoomLevel={2.5}
                    className="product-image-zoom"
                  />
                  {product.isPremium && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'var(--gradient-premium)',
                      color: 'white',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ✨ Premium
                    </div>
                  )}
                </div>
                <div style={{ padding: 'var(--spacing-lg)' }}>
                  <h3 style={{ 
                    color: 'var(--color-deep-emerald)', 
                    marginBottom: 'var(--spacing-sm)',
                    fontSize: 'var(--font-size-h4)',
                    fontFamily: 'var(--font-primary)'
                  }}>
                    {product.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--color-sage)', 
                    fontSize: 'var(--font-size-sm)',
                    marginBottom: 'var(--spacing-md)'
                  }}>
                    {product.category}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between'
                  }}>
                    <PriceHighlight 
                      price={product.price}
                      originalPrice={product.originalPrice}
                      size="medium"
                    />
                    <ButtonPremium 
                      variant="outline" 
                      size="small"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      🛒 Agregar
                    </ButtonPremium>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Productos */}
      <section id="products-section" style={{ 
        background: 'var(--color-pearl-white)',
        padding: 'var(--spacing-section) 0',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '0 var(--spacing-md)'
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: 'var(--font-size-h2)', 
            color: 'var(--color-deep-emerald)', 
            marginBottom: 'var(--spacing-2xl)',
            fontFamily: 'var(--font-primary)'
          }}>
            Colección Premium
          </h2>
          
          <ProductGridPremium
            products={sampleProducts}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewDetails}
          />
        </div>
      </section>

      {/* Footer Premium */}
      <footer style={{ 
        background: 'var(--color-deep-emerald)',
        color: 'var(--color-pearl-white)',
        padding: 'var(--spacing-section) var(--spacing-md)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ 
            fontSize: 'var(--font-size-h3)', 
            marginBottom: 'var(--spacing-xl)',
            fontFamily: 'var(--font-primary)'
          }}>
            Plena Premium
          </h3>
          <p style={{ 
            fontSize: 'var(--font-size-body-large)',
            marginBottom: 'var(--spacing-lg)',
            opacity: 0.9
          }}>
            Experiencia de joyería de lujo con componentes premium optimizados.
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: 'var(--spacing-lg)',
            flexWrap: 'wrap'
          }}>
            <ButtonPremium 
              variant="outline" 
              size="medium"
              onClick={() => window.open('mailto:contacto@plena.co', '_blank')}
            >
              Contáctanos
            </ButtonPremium>
            <ButtonPremium 
              variant="secondary" 
              size="medium"
              onClick={() => window.open('https://instagram.com/plenaestudio.co', '_blank')}
            >
              Síguenos
            </ButtonPremium>
          </div>
        </div>
      </footer>

      {/* Modal de detalles del producto */}
      {isModalOpen && selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          isOpen={isModalOpen}
          onClose={closeModal} 
          onAddToCart={(productId: string, quantity?: number) => {
            console.log(`Agregando ${quantity || 1} unidades del producto ${productId} al carrito`);
            alert(`${quantity || 1} unidades del producto agregadas al carrito`);
          }}
        />
      )}
    </div>
  );
};

export default PremiumShowcase;
