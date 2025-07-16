// 🎨 PLENA STUDIO - COMPONENTES REACT OPTIMIZADOS
// Componentes con paleta de colores de joyería premium

import React from 'react';
import '../tokens-color-optimizados.css';

// ===================================================================
// 🎯 BOTONES PREMIUM
// ===================================================================

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'premium';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ButtonPremium: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false,
  className = '',
  style
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      border: 'none',
      borderRadius: 'var(--border-radius-small)',
      fontFamily: 'var(--font-secondary)',
      fontWeight: 'var(--font-weight-semibold)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all var(--transition-normal)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--spacing-sm)',
      opacity: disabled ? 0.6 : 1,
      position: 'relative' as const,
      overflow: 'hidden' as const,
    };

    const sizeStyles = {
      small: {
        padding: 'var(--spacing-sm) var(--spacing-md)',
        fontSize: 'var(--font-size-body-small)',
      },
      medium: {
        padding: 'var(--spacing-md) var(--spacing-xl)',
        fontSize: 'var(--font-size-body)',
      },
      large: {
        padding: 'var(--spacing-lg) var(--spacing-2xl)',
        fontSize: 'var(--font-size-body-large)',
      },
    };

    const variantStyles = {
      primary: {
        background: 'var(--color-jewel-gold)',
        color: 'var(--color-pearl-white)',
        boxShadow: 'var(--shadow-button)',
      },
      secondary: {
        background: 'var(--color-sage)',
        color: 'var(--color-pearl-white)',
        boxShadow: 'var(--shadow-soft)',
      },
      outline: {
        background: 'transparent',
        color: 'var(--color-jewel-gold)',
        border: '2px solid var(--color-jewel-gold)',
        boxShadow: 'none',
      },
      premium: {
        background: 'var(--gradient-premium)',
        color: 'var(--color-pearl-white)',
        boxShadow: 'var(--shadow-elevated)',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(style || {}),
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const button = e.currentTarget;
    
    if (variant === 'primary') {
      button.style.background = 'var(--color-jewel-gold-hover)';
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = 'var(--shadow-elevated)';
    } else if (variant === 'secondary') {
      button.style.background = 'var(--color-sage-hover)';
      button.style.transform = 'translateY(-2px)';
    } else if (variant === 'outline') {
      button.style.background = 'var(--color-deep-emerald)';
      button.style.color = 'var(--color-pearl-white)';
      button.style.transform = 'translateY(-2px)';
    } else if (variant === 'premium') {
      button.style.transform = 'translateY(-3px)';
      button.style.boxShadow = '0px 12px 32px rgba(212, 175, 55, 0.4)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const button = e.currentTarget;
    button.style.transform = 'translateY(0)';
    
    if (variant === 'primary') {
      button.style.background = 'var(--color-jewel-gold)';
      button.style.boxShadow = 'var(--shadow-button)';
    } else if (variant === 'secondary') {
      button.style.background = 'var(--color-sage)';
      button.style.boxShadow = 'var(--shadow-soft)';
    } else if (variant === 'outline') {
      button.style.background = 'transparent';
      button.style.color = 'var(--color-deep-emerald)';
      button.style.boxShadow = 'none';
    } else if (variant === 'premium') {
      button.style.boxShadow = 'var(--shadow-elevated)';
    }
  };

  return (
    <button
      style={getButtonStyle()}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </button>
  );
};

// ===================================================================
// 🎨 CARD DE PRODUCTO PREMIUM
// ===================================================================

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
  category: string;
  isPremium?: boolean;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
}

const ProductCardPremium: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  originalPrice,
  category,
  isPremium = false,
  onAddToCart,
  onViewDetails
}) => {
  const cardStyle = {
    background: 'var(--color-pearl-white)',
    border: 'var(--border-light)',
    borderRadius: 'var(--border-radius-large)',
    boxShadow: 'var(--shadow-card)',
    transition: 'all var(--transition-normal)',
    overflow: 'hidden' as const,
    cursor: 'pointer',
    position: 'relative' as const,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.boxShadow = 'var(--shadow-card-hover)';
    card.style.transform = 'translateY(-4px)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.boxShadow = 'var(--shadow-card)';
    card.style.transform = 'translateY(0)';
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onViewDetails}
    >
      {/* Premium Badge */}
      {isPremium && (
        <div style={{
          position: 'absolute',
          top: 'var(--spacing-md)',
          right: 'var(--spacing-md)',
          background: 'var(--color-luxury-purple)',
          color: 'var(--color-pearl-white)',
          padding: 'var(--spacing-xs) var(--spacing-md)',
          borderRadius: 'var(--border-radius-small)',
          fontSize: 'var(--font-size-caption)',
          fontWeight: 'var(--font-weight-semibold)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          zIndex: 10,
        }}>
          Premium
        </div>
      )}

      {/* Imagen */}
      <div style={{
        width: '100%',
        height: '280px',
        overflow: 'hidden',
        background: 'var(--color-soft-cream)',
        position: 'relative',
      }}>
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--transition-normal)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
      </div>

      {/* Contenido */}
      <div style={{
        padding: 'var(--spacing-card)',
      }}>
        {/* Categoría */}
        <div style={{
          color: 'var(--color-warm-gray)',
          fontSize: 'var(--font-size-body-small)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: 'var(--spacing-sm)',
        }}>
          {category}
        </div>

        {/* Título */}
        <h3 style={{
          color: 'var(--color-charcoal)',
          fontSize: 'var(--font-size-h4)',
          fontFamily: 'var(--font-primary)',
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--spacing-md)',
          lineHeight: '1.3',
        }}>
          {title}
        </h3>

        {/* Precio */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-sm)',
          marginBottom: 'var(--spacing-lg)',
        }}>
          <span style={{
            color: 'var(--color-jewel-gold)',
            fontSize: 'var(--font-size-h4)',
            fontFamily: 'var(--font-primary)',
            fontWeight: 'var(--font-weight-bold)',
          }}>
            {price}
          </span>
          {originalPrice && (
            <span style={{
              color: 'var(--color-warm-gray)',
              fontSize: 'var(--font-size-body)',
              textDecoration: 'line-through',
            }}>
              {originalPrice}
            </span>
          )}
        </div>

        {/* Botones */}
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-sm)',
        }}>
          <ButtonPremium
            variant="primary"
            size="small"
            onClick={(e) => {
              e?.stopPropagation();
              onAddToCart?.();
            }}
            style={{ flex: 1 }}
          >
            Agregar al Carrito
          </ButtonPremium>
          <ButtonPremium
            variant="outline"
            size="small"
            onClick={(e) => {
              e?.stopPropagation();
              onViewDetails?.();
            }}
          >
            Ver Detalles
          </ButtonPremium>
        </div>
      </div>
    </div>
  );
};

// ===================================================================
// 🎨 BADGE PREMIUM
// ===================================================================

interface BadgeProps {
  variant?: 'premium' | 'new' | 'sale' | 'bestseller';
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const BadgePremium: React.FC<BadgeProps> = ({
  variant = 'premium',
  children,
  size = 'medium'
}) => {
  const variantStyles = {
    premium: {
      background: 'var(--color-luxury-purple)',
      color: 'var(--color-pearl-white)',
    },
    new: {
      background: 'var(--color-mint-green)',
      color: 'var(--color-charcoal)',
    },
    sale: {
      background: 'var(--color-jewel-gold)',
      color: 'var(--color-pearl-white)',
    },
    bestseller: {
      background: 'var(--color-deep-emerald)',
      color: 'var(--color-pearl-white)',
    },
  };

  const sizeStyles = {
    small: {
      padding: 'var(--spacing-xs) var(--spacing-sm)',
      fontSize: 'var(--font-size-caption)',
    },
    medium: {
      padding: 'var(--spacing-xs) var(--spacing-md)',
      fontSize: 'var(--font-size-body-small)',
    },
    large: {
      padding: 'var(--spacing-sm) var(--spacing-lg)',
      fontSize: 'var(--font-size-body)',
    },
  };

  return (
    <span style={{
      ...variantStyles[variant],
      ...sizeStyles[size],
      borderRadius: 'var(--border-radius-small)',
      fontWeight: 'var(--font-weight-semibold)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      display: 'inline-block',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
};

// ===================================================================
// 🎨 PRECIO DESTACADO
// ===================================================================

interface PriceProps {
  price: string;
  originalPrice?: string;
  currency?: string;
  size?: 'small' | 'medium' | 'large';
  showCurrency?: boolean;
}

const PriceHighlight: React.FC<PriceProps> = ({
  price,
  originalPrice,
  currency = '$',
  size = 'medium',
  showCurrency = true
}) => {
  const sizeStyles = {
    small: {
      fontSize: 'var(--font-size-body-large)',
    },
    medium: {
      fontSize: 'var(--font-size-h4)',
    },
    large: {
      fontSize: 'var(--font-size-h2)',
    },
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-sm)',
    }}>
      <span style={{
        color: 'var(--color-jewel-gold)',
        fontFamily: 'var(--font-primary)',
        fontWeight: 'var(--font-weight-bold)',
        ...sizeStyles[size],
      }}>
        {showCurrency && currency}{price}
      </span>
      {originalPrice && (
        <span style={{
          color: 'var(--color-warm-gray)',
          fontSize: 'var(--font-size-body)',
          textDecoration: 'line-through',
          fontWeight: 'var(--font-weight-normal)',
        }}>
          {showCurrency && currency}{originalPrice}
        </span>
      )}
    </div>
  );
};

// ===================================================================
// 🎨 HERO SECTION PREMIUM
// ===================================================================

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  ctaText: string;
  onCtaClick: () => void;
}

const HeroSectionPremium: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  ctaText,
  onCtaClick
}) => {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: backgroundImage 
        ? `linear-gradient(rgba(15, 81, 50, 0.4), rgba(15, 81, 50, 0.4)), url(${backgroundImage})`
        : 'var(--gradient-hero)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: 'var(--spacing-section) var(--spacing-md)',
      textAlign: 'center' as const,
    }}>
      <div style={{
        maxWidth: '800px',
        color: backgroundImage ? 'var(--color-pearl-white)' : 'var(--color-charcoal)',
      }}>
        {/* Subtitle */}
        <div style={{
          color: 'var(--color-jewel-gold)',
          fontSize: 'var(--font-size-body-large)',
          fontFamily: 'var(--font-secondary)',
          fontWeight: 'var(--font-weight-semibold)',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: 'var(--spacing-lg)',
        }}>
          {subtitle}
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'var(--font-size-h1)',
          fontFamily: 'var(--font-primary)',
          fontWeight: 'var(--font-weight-bold)',
          lineHeight: '1.2',
          marginBottom: 'var(--spacing-xl)',
        }}>
          {title}
        </h1>

        {/* Description */}
        <p style={{
          fontSize: 'var(--font-size-body-large)',
          fontFamily: 'var(--font-secondary)',
          lineHeight: '1.6',
          marginBottom: 'var(--spacing-2xl)',
          opacity: 0.9,
        }}>
          {description}
        </p>

        {/* CTA Button */}
        <ButtonPremium
          variant="premium"
          size="large"
          onClick={onCtaClick}
        >
          {ctaText}
        </ButtonPremium>
      </div>
    </section>
  );
};

// ===================================================================
// 🎨 GRID DE PRODUCTOS
// ===================================================================

interface ProductGridProps {
  products: Array<{
    id: string;
    image: string;
    title: string;
    price: string;
    originalPrice?: string;
    category: string;
    isPremium?: boolean;
  }>;
  onAddToCart: (productId: string) => void;
  onViewDetails: (productId: string) => void;
}

const ProductGridPremium: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  onViewDetails
}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: 'var(--spacing-xl)',
      padding: 'var(--spacing-section) var(--spacing-md)',
    }}>
      {products.map((product) => (
        <ProductCardPremium
          key={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
          originalPrice={product.originalPrice}
          category={product.category}
          isPremium={product.isPremium}
          onAddToCart={() => onAddToCart(product.id)}
          onViewDetails={() => onViewDetails(product.id)}
        />
      ))}
    </div>
  );
};

// ===================================================================
// 🎨 EXPORTACIONES
// ===================================================================

export {
  ButtonPremium,
  ProductCardPremium,
  BadgePremium,
  PriceHighlight,
  HeroSectionPremium,
  ProductGridPremium,
};
