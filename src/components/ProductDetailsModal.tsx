// 🔍 PLENA - VISTA DE DETALLES DE PRODUCTO
// Modal premium para mostrar detalles completos de productos

import React, { useState } from 'react';
import { ButtonPremium, BadgePremium, PriceHighlight } from './ComponentesPremium';
import ImageWithZoom from './ImageWithZoom';

interface ProductDetails {
  id: string;
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
  category: string;
  isPremium: boolean;
  description: string;
  features: string[];
  materials: string[];
  dimensions: string;
  weight: string;
  gallery: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

interface ProductDetailsModalProps {
  product: ProductDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: string, quantity?: number) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product || !isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        transition: 'all 0.3s ease'
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          transform: isOpen ? 'scale(1)' : 'scale(0.9)',
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px',
            borderBottom: '2px solid var(--color-jewel-gold)',
            background: 'var(--gradient-premium)',
            color: 'white',
            borderRadius: '20px 20px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <h2 style={{
            margin: 0,
            fontFamily: 'var(--font-luxury)',
            fontSize: '1.8rem',
            fontWeight: '700'
          }}>
            Detalles del Producto
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '5px 10px',
              borderRadius: '50%',
              transition: 'background 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          padding: '30px'
        }}>
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div style={{
              marginBottom: '20px',
              height: '400px',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)'
            }}>
              <ImageWithZoom
                src={product.gallery[selectedImage] || product.image}
                alt={product.title}
                zoomLevel={3}
                className="product-detail-image"
              />
            </div>

            {/* Gallery Thumbnails */}
            <div style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap'
            }}>
              {product.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '10px',
                    border: selectedImage === index ? '3px solid var(--color-jewel-gold)' : '2px solid #ddd',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            {/* Title and Category */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px'
              }}>
                <h1 style={{
                  margin: 0,
                  fontFamily: 'var(--font-luxury)',
                  fontSize: '2rem',
                  color: 'var(--color-deep-emerald)'
                }}>
                  {product.title}
                </h1>
                {product.isPremium && (
                  <BadgePremium variant="premium" size="medium">
                    Premium
                  </BadgePremium>
                )}
              </div>
              <p style={{
                color: 'var(--color-sage)',
                fontSize: '1.1rem',
                margin: 0,
                fontFamily: 'var(--font-elegant)'
              }}>
                {product.category}
              </p>
            </div>

            {/* Price */}
            <div style={{ marginBottom: '20px' }}>
              <PriceHighlight
                price={product.price}
                originalPrice={product.originalPrice}
                size="large"
              />
            </div>

            {/* Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < product.rating ? 'var(--color-jewel-gold)' : '#ddd',
                      fontSize: '20px'
                    }}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <span style={{
                color: 'var(--color-sage)',
                fontSize: '0.9rem'
              }}>
                ({product.reviews} reseñas)
              </span>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{
                color: 'var(--color-deep-emerald)',
                fontFamily: 'var(--font-primary)',
                marginBottom: '10px'
              }}>
                Descripción
              </h3>
              <p style={{
                color: 'var(--color-charcoal)',
                lineHeight: '1.6',
                fontFamily: 'var(--font-elegant)'
              }}>
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{
                color: 'var(--color-deep-emerald)',
                fontFamily: 'var(--font-primary)',
                marginBottom: '10px'
              }}>
                Características
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '8px',
                      color: 'var(--color-charcoal)'
                    }}
                  >
                    <span style={{ color: 'var(--color-jewel-gold)' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div>
                <h4 style={{
                  color: 'var(--color-deep-emerald)',
                  marginBottom: '10px',
                  fontSize: '1.1rem'
                }}>
                  Materiales
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {product.materials.map((material, index) => (
                    <li key={index} style={{
                      color: 'var(--color-sage)',
                      fontSize: '0.9rem',
                      marginBottom: '5px'
                    }}>
                      • {material}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{
                  color: 'var(--color-deep-emerald)',
                  marginBottom: '10px',
                  fontSize: '1.1rem'
                }}>
                  Especificaciones
                </h4>
                <div style={{
                  color: 'var(--color-sage)',
                  fontSize: '0.9rem'
                }}>
                  <p style={{ marginBottom: '5px' }}>
                    <strong>Dimensiones:</strong> {product.dimensions}
                  </p>
                  <p style={{ marginBottom: '5px' }}>
                    <strong>Peso:</strong> {product.weight}
                  </p>
                  <p style={{
                    color: product.inStock ? 'var(--color-mint-green)' : 'var(--color-rose-gold)',
                    fontWeight: 'bold'
                  }}>
                    {product.inStock ? '✓ En stock' : '✗ Agotado'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{
                  color: 'var(--color-charcoal)',
                  fontWeight: '600'
                }}>
                  Cantidad:
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '2px solid var(--color-jewel-gold)',
                  borderRadius: '25px',
                  overflow: 'hidden'
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      color: 'var(--color-jewel-gold)',
                      fontWeight: 'bold'
                    }}
                  >
                    -
                  </button>
                  <span style={{
                    padding: '8px 16px',
                    background: 'var(--color-jewel-gold)',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      color: 'var(--color-jewel-gold)',
                      fontWeight: 'bold'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              <ButtonPremium
                variant="premium"
                size="large"
                onClick={() => onAddToCart(product.id, quantity)}
                disabled={!product.inStock}
                style={{ flex: '1', minWidth: '180px' }}
              >
                🛒 Agregar al Carrito
              </ButtonPremium>
              <ButtonPremium
                variant="outline"
                size="large"
                onClick={() => {/* Implementar wishlist */}}
                style={{ minWidth: '50px' }}
              >
                💖
              </ButtonPremium>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
