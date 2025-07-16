// 🧭 PLENA - NAVBAR RESPONSIVE PREMIUM
// Barra de navegación con logo dinámico y menú hamburguesa

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PlenaLogo from './PlenaLogo';
import HamburgerMenu from './HamburgerMenu';

interface NavbarProps {
  transparent?: boolean;
  variant?: 'default' | 'dark' | 'light';
}

const Navbar: React.FC<NavbarProps> = ({ 
  transparent = false, 
  variant = 'default' 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detectar viewport móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cerrar menú en cambio de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const getNavbarStyle = () => {
    const isTransparent = transparent && !scrolled;
    
    return {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: isTransparent 
        ? 'rgba(248, 249, 250, 0.9)' 
        : 'var(--color-pearl-white)',
      backdropFilter: isTransparent ? 'blur(10px)' : 'none',
      borderBottom: isTransparent 
        ? '1px solid rgba(212, 175, 55, 0.2)' 
        : '2px solid var(--color-jewel-gold)',
      boxShadow: scrolled 
        ? '0 2px 20px rgba(0, 0, 0, 0.1)' 
        : 'none',
      transition: 'all 0.3s ease',
      padding: scrolled ? '10px 0' : '15px 0'
    };
  };

  const mainNavItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Catálogo', path: '/catalogo' },
    { label: 'Premium', path: '/premium-showcase' },
    { label: 'Anillos', path: '/anillos' },
    { label: 'Aretes', path: '/aretes' },
    { label: 'Pulseras', path: '/pulseras' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <nav style={getNavbarStyle()}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <PlenaLogo 
              size={scrolled ? 90 : 110} 
              variant={variant === 'dark' ? 'white' : 'default'}
              animated={true}
            />
          </div>

          {/* Navegación desktop */}
          {!isMobile && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px'
              }}
            >
              {mainNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: location.pathname === item.path 
                      ? 'var(--color-jewel-gold)' 
                      : 'var(--color-charcoal)',
                    fontSize: '16px',
                    fontWeight: location.pathname === item.path ? '700' : '500',
                    fontFamily: 'var(--font-primary)',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.path) {
                      e.currentTarget.style.color = 'var(--color-jewel-gold)';
                      e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.path) {
                      e.currentTarget.style.color = 'var(--color-charcoal)';
                      e.currentTarget.style.background = 'none';
                    }
                  }}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '6px',
                        height: '6px',
                        background: 'var(--color-jewel-gold)',
                        borderRadius: '50%'
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Botones de acción */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}
          >
            {/* Búsqueda */}
            <button
              onClick={() => navigate('/buscar')}
              style={{
                background: 'none',
                border: '2px solid var(--color-jewel-gold)',
                color: 'var(--color-jewel-gold)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-jewel-gold)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = 'var(--color-jewel-gold)';
              }}
            >
              🔍
            </button>

            {/* Carrito */}
            <button
              onClick={() => navigate('/shopping-cart')}
              style={{
                background: 'none',
                border: '2px solid var(--color-jewel-gold)',
                color: 'var(--color-jewel-gold)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-jewel-gold)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = 'var(--color-jewel-gold)';
              }}
            >
              🛒
              {/* Contador de items (ejemplo) */}
              <span
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: 'var(--color-rose-gold)',
                  color: 'white',
                  fontSize: '10px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}
              >
                0
              </span>
            </button>

            {/* Botón hamburguesa (móvil) */}
            {isMobile && (
              <button
                onClick={toggleMenu}
                style={{
                  background: 'none',
                  border: '2px solid var(--color-jewel-gold)',
                  color: 'var(--color-jewel-gold)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '3px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-jewel-gold)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.color = 'var(--color-jewel-gold)';
                }}
              >
                {/* Líneas del hamburguesa con animación */}
                <div
                  style={{
                    width: '18px',
                    height: '2px',
                    background: 'currentColor',
                    transition: 'all 0.3s ease',
                    transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)'
                  }}
                />
                <div
                  style={{
                    width: '18px',
                    height: '2px',
                    background: 'currentColor',
                    transition: 'all 0.3s ease',
                    opacity: isMenuOpen ? 0 : 1
                  }}
                />
                <div
                  style={{
                    width: '18px',
                    height: '2px',
                    background: 'currentColor',
                    transition: 'all 0.3s ease',
                    transform: isMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'rotate(0)'
                  }}
                />
              </button>
            )}
          </div>
        </div>

        {/* Patrón decorativo inferior */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--gradient-premium)',
            opacity: scrolled ? 1 : 0.5,
            transition: 'opacity 0.3s ease'
          }}
        />
      </nav>

      {/* Menú hamburguesa */}
      <HamburgerMenu isOpen={isMenuOpen} onToggle={toggleMenu} />

      {/* Espaciador para contenido */}
      <div style={{ height: scrolled ? '70px' : '85px' }} />
    </>
  );
};

export default Navbar;
