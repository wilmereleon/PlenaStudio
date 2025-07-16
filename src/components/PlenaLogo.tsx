// 🎨 PLENA - LOGO DINÁMICO PREMIUM
// Logo SVG que refleja el nombre "Plena" con elementos de joyería

import React, { useState } from 'react';

interface PlenaLogoProps {
  size?: number;
  variant?: 'default' | 'white' | 'dark' | 'gold';
  animated?: boolean;
  className?: string;
}

const PlenaLogo: React.FC<PlenaLogoProps> = ({
  size = 120,
  variant = 'default',
  animated = true,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getColors = () => {
    switch (variant) {
      case 'white':
        return {
          primary: '#FFFFFF',
          secondary: '#F8F9FA',
          accent: '#E8B4A0',
          text: '#FFFFFF'
        };
      case 'dark':
        return {
          primary: '#2C3E50',
          secondary: '#0F5132',
          accent: '#D4AF37',
          text: '#2C3E50'
        };
      case 'gold':
        return {
          primary: '#D4AF37',
          secondary: '#E8B4A0',
          accent: '#F8F9FA',
          text: '#D4AF37'
        };
      default:
        return {
          primary: '#D4AF37',
          secondary: '#0F5132',
          accent: '#E8B4A0',
          text: '#2C3E50'
        };
    }
  };

  const colors = getColors();

  return (
    <div 
      className={`plena-logo ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
    >
      <svg
        width={size}
        height={size * 0.8}
        viewBox="0 0 120 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: isHovered && animated ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Definición de gradientes */}
        <defs>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.secondary} />
          </linearGradient>
          
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.accent} />
            <stop offset="100%" stopColor={colors.primary} />
          </linearGradient>

          <radialGradient id="gemGradient" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor={colors.accent} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0.6" />
          </radialGradient>

          {/* Filtro de brillo para efecto premium */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Fondo del logo - forma de gema */}
        <path
          d="M20 30 L60 10 L100 30 L90 60 L30 60 Z"
          fill="url(#gemGradient)"
          stroke={colors.primary}
          strokeWidth="1"
          style={{
            transform: isHovered && animated ? 'scale(1.02)' : 'scale(1)',
            transformOrigin: 'center',
            transition: 'transform 0.3s ease'
          }}
        />

        {/* Letra P - Estilizada como joya */}
        <g transform="translate(15, 20)">
          <path
            d="M5 5 L5 35 M5 5 L18 5 Q25 5 25 12 Q25 19 18 19 L5 19"
            stroke="url(#primaryGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={isHovered && animated ? "url(#glow)" : undefined}
          />
          {/* Gema en la P */}
          <circle
            cx="20"
            cy="12"
            r="2"
            fill={colors.accent}
            style={{
              transform: isHovered && animated ? 'scale(1.2)' : 'scale(1)',
              transformOrigin: 'center',
              transition: 'transform 0.3s ease'
            }}
          />
        </g>

        {/* Elementos decorativos - patrones de bufanda */}
        <g opacity="0.6">
          {/* Líneas onduladas inspiradas en bufandas */}
          <path
            d="M35 15 Q40 12 45 15 Q50 18 55 15 Q60 12 65 15"
            stroke={colors.accent}
            strokeWidth="1"
            fill="none"
            style={{
              transform: isHovered && animated ? 'translateY(-1px)' : 'translateY(0)',
              transition: 'transform 0.3s ease'
            }}
          />
          
          <path
            d="M35 50 Q40 53 45 50 Q50 47 55 50 Q60 53 65 50"
            stroke={colors.accent}
            strokeWidth="1"
            fill="none"
            style={{
              transform: isHovered && animated ? 'translateY(1px)' : 'translateY(0)',
              transition: 'transform 0.3s ease'
            }}
          />
        </g>

        {/* Brillos dinámicos */}
        {animated && (
          <g>
            <circle
              cx="25"
              cy="25"
              r="1"
              fill={colors.accent}
              style={{
                opacity: isHovered ? 1 : 0.3,
                transform: isHovered ? 'scale(1.5)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}
            />
            <circle
              cx="85"
              cy="35"
              r="1"
              fill={colors.accent}
              style={{
                opacity: isHovered ? 1 : 0.3,
                transform: isHovered ? 'scale(1.5)' : 'scale(1)',
                transition: 'all 0.3s ease 0.1s'
              }}
            />
          </g>
        )}
      </svg>

      {/* Texto del logo */}
      <div
        style={{
          marginLeft: '10px',
          fontFamily: 'var(--font-primary)',
          fontSize: `${size * 0.25}px`,
          fontWeight: '700',
          color: colors.text,
          letterSpacing: '1px',
          textShadow: isHovered && animated ? `0 0 10px ${colors.accent}` : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        PLENA
        <div
          style={{
            fontSize: `${size * 0.12}px`,
            fontWeight: '400',
            color: colors.secondary,
            letterSpacing: '2px',
            marginTop: '-3px'
          }}
        >
          JOYERÍA PREMIUM
        </div>
      </div>
    </div>
  );
};

export default PlenaLogo;
