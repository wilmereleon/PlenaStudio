// 🍔 PLENA - MENÚ HAMBURGUESA RESPONSIVE PREMIUM
// Menú desplegable con animaciones y diseño inspirado en joyería

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlenaLogo from './PlenaLogo';

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  description: string;
  isNew?: boolean;
  isPremium?: boolean;
}

interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Inicio',
      path: '/',
      icon: '🏠',
      description: 'Página principal'
    },
    {
      id: 'catalogo',
      label: 'Catálogo',
      path: '/catalogo',
      icon: '📦',
      description: 'Productos completos'
    },
    {
      id: 'premium',
      label: 'Premium',
      path: '/premium-showcase',
      icon: '💎',
      description: 'Colección exclusiva',
      isPremium: true
    },
    {
      id: 'anillos',
      label: 'Anillos',
      path: '/anillos',
      icon: '💍',
      description: 'Anillos de compromiso'
    },
    {
      id: 'aretes',
      label: 'Aretes',
      path: '/aretes',
      icon: '👂',
      description: 'Aretes premium'
    },
    {
      id: 'pulseras',
      label: 'Pulseras',
      path: '/pulseras',
      icon: '🔗',
      description: 'Pulseras elegantes'
    },
    {
      id: 'bufandas',
      label: 'Bufandas',
      path: '/bufandas',
      icon: '🧣',
      description: 'Bufandas de lujo'
    },
    {
      id: 'combinaciones',
      label: 'Combinaciones',
      path: '/combinaciones',
      icon: '✨',
      description: 'Sets completos'
    },
    {
      id: 'carrito',
      label: 'Carrito',
      path: '/shopping-cart',
      icon: '🛒',
      description: 'Mis compras'
    },
    {
      id: 'login',
      label: 'Iniciar Sesión',
      path: '/login',
      icon: '👤',
      description: 'Acceder a mi cuenta'
    },
    {
      id: 'register',
      label: 'Registrarse',
      path: '/register',
      icon: '📝',
      description: 'Crear cuenta nueva'
    }
  ];

  const handleItemClick = (item: MenuItem) => {
    navigate(item.path);
    onToggle();
  };

  // Cerrar menú con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onToggle();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onToggle]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998,
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
          onClick={onToggle}
        />
      )}

      {/* Menú hamburguesa */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '320px',
          background: 'linear-gradient(135deg, var(--color-pearl-white) 0%, var(--color-soft-cream) 100%)',
          boxShadow: '-5px 0 20px rgba(0, 0, 0, 0.1)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          zIndex: 999,
          overflowY: 'auto',
          borderLeft: '3px solid var(--color-jewel-gold)'
        }}
      >
        {/* Header del menú */}
        <div
          style={{
            padding: '20px',
            background: 'var(--gradient-premium)',
            color: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 1000
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <PlenaLogo size={80} variant="white" animated />
            <button
              onClick={onToggle}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '5px',
                borderRadius: '5px',
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              ✕
            </button>
          </div>
          
          {/* Patrón decorativo inspirado en bufandas */}
          <div
            style={{
              marginTop: '15px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-1px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '6px',
                height: '4px',
                background: 'white',
                borderRadius: '50%'
              }}
            />
          </div>
        </div>

        {/* Items del menú */}
        <div style={{ padding: '10px 0' }}>
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              style={{
                margin: '5px 15px',
                borderRadius: '12px',
                overflow: 'hidden',
                background: activeItem === item.id ? 'var(--color-jewel-gold)' : 'transparent',
                transform: isOpen ? 'translateX(0)' : 'translateX(50px)',
                opacity: isOpen ? 1 : 0,
                transition: `all 0.3s ease ${index * 0.05}s`,
                cursor: 'pointer'
              }}
              onMouseEnter={() => setActiveItem(item.id)}
              onMouseLeave={() => setActiveItem(null)}
              onClick={() => handleItemClick(item)}
            >
              <div
                style={{
                  padding: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  color: activeItem === item.id ? 'white' : 'var(--color-charcoal)',
                  transition: 'all 0.3s ease'
                }}
              >
                <span
                  style={{
                    fontSize: '20px',
                    marginRight: '15px',
                    transform: activeItem === item.id ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  {item.icon}
                </span>
                
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: 'var(--font-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {item.label}
                    {item.isPremium && (
                      <span
                        style={{
                          fontSize: '10px',
                          background: 'var(--gradient-premium)',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '10px',
                          fontWeight: 'bold'
                        }}
                      >
                        PREMIUM
                      </span>
                    )}
                    {item.isNew && (
                      <span
                        style={{
                          fontSize: '10px',
                          background: 'var(--color-mint-green)',
                          color: 'var(--color-deep-emerald)',
                          padding: '2px 6px',
                          borderRadius: '10px',
                          fontWeight: 'bold'
                        }}
                      >
                        NUEVO
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: activeItem === item.id ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-sage)',
                      marginTop: '2px'
                    }}
                  >
                    {item.description}
                  </div>
                </div>

                <div
                  style={{
                    transform: activeItem === item.id ? 'translateX(0)' : 'translateX(10px)',
                    opacity: activeItem === item.id ? 1 : 0,
                    transition: 'all 0.3s ease'
                  }}
                >
                  →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer del menú */}
        <div
          style={{
            padding: '20px',
            marginTop: 'auto',
            borderTop: '1px solid var(--color-jewel-gold)',
            background: 'var(--color-soft-cream)',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              fontSize: '12px',
              color: 'var(--color-sage)',
              marginBottom: '10px'
            }}
          >
            Joyería Premium
          </div>
          
          {/* Patrones decorativos */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '10px'
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  background: 'var(--gradient-premium)',
                  borderRadius: '50%',
                  opacity: 0.6,
                  animation: `pulse 2s infinite ${i * 0.2}s`
                }}
              />
            ))}
          </div>
          
          <div
            style={{
              fontSize: '10px',
              color: 'var(--color-charcoal)',
              fontWeight: '600'
            }}
          >
            © 2024 Plena
          </div>
        </div>
      </div>

      {/* Estilos de animación */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}
      </style>
    </>
  );
};

export default HamburgerMenu;
