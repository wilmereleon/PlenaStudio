// 🎨 PLENA - DEMO DE NAVEGACIÓN Y LOGO
// Página de demostración del nuevo sistema de navegación

import React from 'react';
import Navbar from '../components/Navbar';
import PlenaLogo from '../components/PlenaLogo';

const NavigationDemo: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      fontFamily: 'var(--font-secondary)' 
    }}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{
        background: 'var(--gradient-hero)',
        padding: '100px 20px 80px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3rem',
            color: 'var(--color-deep-emerald)',
            marginBottom: '20px',
            fontFamily: 'var(--font-primary)'
          }}>
            🎨 Nuevo Sistema de Navegación
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--color-charcoal)',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Descubre el nuevo logo dinámico y menú hamburguesa responsive para Plena, 
            inspirado en la elegancia de la joyería premium.
          </p>
        </div>
      </section>

      {/* Logo Showcase */}
      <section style={{
        background: 'var(--color-pearl-white)',
        padding: '80px 20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: 'var(--color-deep-emerald)',
            textAlign: 'center',
            marginBottom: '50px',
            fontFamily: 'var(--font-primary)'
          }}>
            🎯 Logo Dinámico Plena
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            marginBottom: '50px'
          }}>
            <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '15px',
              boxShadow: 'var(--shadow-card)',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                color: 'var(--color-charcoal)', 
                marginBottom: '20px',
                fontSize: '1.5rem'
              }}>
                Versión Default
              </h3>
              <PlenaLogo size={150} variant="default" animated />
              <p style={{ 
                color: 'var(--color-sage)', 
                marginTop: '15px',
                fontSize: '0.9rem'
              }}>
                Logo principal con colores premium
              </p>
            </div>

            <div style={{
              background: 'var(--color-deep-emerald)',
              padding: '40px',
              borderRadius: '15px',
              boxShadow: 'var(--shadow-card)',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                color: 'white', 
                marginBottom: '20px',
                fontSize: '1.5rem'
              }}>
                Versión White
              </h3>
              <PlenaLogo size={150} variant="white" animated />
              <p style={{ 
                color: 'var(--color-mint-green)', 
                marginTop: '15px',
                fontSize: '0.9rem'
              }}>
                Para fondos oscuros
              </p>
            </div>

            <div style={{
              background: 'var(--color-jewel-gold)',
              padding: '40px',
              borderRadius: '15px',
              boxShadow: 'var(--shadow-card)',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                color: 'white', 
                marginBottom: '20px',
                fontSize: '1.5rem'
              }}>
                Versión Gold
              </h3>
              <PlenaLogo size={150} variant="gold" animated />
              <p style={{ 
                color: 'var(--color-pearl-white)', 
                marginTop: '15px',
                fontSize: '0.9rem'
              }}>
                Versión premium dorada
              </p>
            </div>
          </div>

          <div style={{
            background: 'var(--color-soft-cream)',
            padding: '30px',
            borderRadius: '15px',
            marginBottom: '40px'
          }}>
            <h3 style={{ 
              color: 'var(--color-deep-emerald)', 
              marginBottom: '20px',
              fontSize: '1.8rem',
              textAlign: 'center'
            }}>
              ✨ Características del Logo
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: 'var(--shadow-light)'
              }}>
                <h4 style={{ color: 'var(--color-jewel-gold)', marginBottom: '10px' }}>
                  💎 Diseño Inspirado en Joyería
                </h4>
                <p style={{ color: 'var(--color-charcoal)', fontSize: '0.9rem' }}>
                  Forma de gema con elementos decorativos que evocan la elegancia de las joyas premium.
                </p>
              </div>

              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: 'var(--shadow-light)'
              }}>
                <h4 style={{ color: 'var(--color-jewel-gold)', marginBottom: '10px' }}>
                  🎭 Animaciones Interactivas
                </h4>
                <p style={{ color: 'var(--color-charcoal)', fontSize: '0.9rem' }}>
                  Efectos hover con escalado, brillo y movimientos suaves que crean una experiencia premium.
                </p>
              </div>

              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: 'var(--shadow-light)'
              }}>
                <h4 style={{ color: 'var(--color-jewel-gold)', marginBottom: '10px' }}>
                  🧣 Elementos de Bufanda
                </h4>
                <p style={{ color: 'var(--color-charcoal)', fontSize: '0.9rem' }}>
                  Líneas onduladas decorativas inspiradas en los patrones de bufandas de lujo.
                </p>
              </div>

              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: 'var(--shadow-light)'
              }}>
                <h4 style={{ color: 'var(--color-jewel-gold)', marginBottom: '10px' }}>
                  📱 Totalmente Responsive
                </h4>
                <p style={{ color: 'var(--color-charcoal)', fontSize: '0.9rem' }}>
                  Tamaño adaptable y múltiples variantes para diferentes contextos y fondos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Features */}
      <section style={{
        background: 'var(--color-mint-green)',
        padding: '80px 20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: 'var(--color-deep-emerald)',
            textAlign: 'center',
            marginBottom: '50px',
            fontFamily: 'var(--font-primary)'
          }}>
            🍔 Menú Hamburguesa Responsive
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: 'var(--shadow-card)'
            }}>
              <h3 style={{ 
                color: 'var(--color-deep-emerald)', 
                marginBottom: '15px',
                fontSize: '1.5rem'
              }}>
                📱 Diseño Móvil Primero
              </h3>
              <p style={{ color: 'var(--color-charcoal)', marginBottom: '15px' }}>
                Menú deslizante desde la derecha con animaciones fluidas y overlay de fondo.
              </p>
              <ul style={{ 
                color: 'var(--color-sage)', 
                listStyle: 'none', 
                padding: 0 
              }}>
                <li style={{ marginBottom: '8px' }}>✨ Animación de entrada escalonada</li>
                <li style={{ marginBottom: '8px' }}>🎯 Efectos hover premium</li>
                <li style={{ marginBottom: '8px' }}>⌨️ Navegación por teclado</li>
                <li style={{ marginBottom: '8px' }}>🔒 Cierre con Escape</li>
              </ul>
            </div>

            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: 'var(--shadow-card)'
            }}>
              <h3 style={{ 
                color: 'var(--color-deep-emerald)', 
                marginBottom: '15px',
                fontSize: '1.5rem'
              }}>
                💎 Elementos Premium
              </h3>
              <p style={{ color: 'var(--color-charcoal)', marginBottom: '15px' }}>
                Cada item del menú incluye iconos, descripciones y badges especiales.
              </p>
              <ul style={{ 
                color: 'var(--color-sage)', 
                listStyle: 'none', 
                padding: 0 
              }}>
                <li style={{ marginBottom: '8px' }}>🏷️ Badges "Premium" y "Nuevo"</li>
                <li style={{ marginBottom: '8px' }}>📝 Descripciones contextuales</li>
                <li style={{ marginBottom: '8px' }}>🎨 Iconos expresivos</li>
                <li style={{ marginBottom: '8px' }}>🌟 Patrones decorativos</li>
              </ul>
            </div>

            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: 'var(--shadow-card)'
            }}>
              <h3 style={{ 
                color: 'var(--color-deep-emerald)', 
                marginBottom: '15px',
                fontSize: '1.5rem'
              }}>
                🎯 Navbar Inteligente
              </h3>
              <p style={{ color: 'var(--color-charcoal)', marginBottom: '15px' }}>
                Barra de navegación que se adapta al scroll y viewport con efectos premium.
              </p>
              <ul style={{ 
                color: 'var(--color-sage)', 
                listStyle: 'none', 
                padding: 0 
              }}>
                <li style={{ marginBottom: '8px' }}>📏 Reducción en scroll</li>
                <li style={{ marginBottom: '8px' }}>🌫️ Backdrop blur</li>
                <li style={{ marginBottom: '8px' }}>🎨 Indicadores de página activa</li>
                <li style={{ marginBottom: '8px' }}>🔍 Búsqueda y carrito integrados</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section style={{
        background: 'var(--color-pearl-white)',
        padding: '80px 20px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: 'var(--color-deep-emerald)',
            marginBottom: '30px',
            fontFamily: 'var(--font-primary)'
          }}>
            🚀 Cómo Probar
          </h2>
          
          <div style={{
            background: 'var(--color-soft-cream)',
            padding: '30px',
            borderRadius: '15px',
            marginBottom: '30px'
          }}>
            <h3 style={{ 
              color: 'var(--color-charcoal)', 
              marginBottom: '20px',
              fontSize: '1.3rem'
            }}>
              📱 En Móvil
            </h3>
            <p style={{ color: 'var(--color-sage)', fontSize: '1.1rem' }}>
              Reduce el tamaño de la ventana o usa las herramientas de desarrollo para ver el menú hamburguesa en acción.
            </p>
          </div>

          <div style={{
            background: 'var(--color-soft-cream)',
            padding: '30px',
            borderRadius: '15px',
            marginBottom: '30px'
          }}>
            <h3 style={{ 
              color: 'var(--color-charcoal)', 
              marginBottom: '20px',
              fontSize: '1.3rem'
            }}>
              🖥️ En Desktop
            </h3>
            <p style={{ color: 'var(--color-sage)', fontSize: '1.1rem' }}>
              Navega usando el menú horizontal y observa los efectos hover y los indicadores de página activa.
            </p>
          </div>

          <div style={{
            background: 'var(--gradient-premium)',
            color: 'white',
            padding: '30px',
            borderRadius: '15px'
          }}>
            <h3 style={{ 
              marginBottom: '20px',
              fontSize: '1.3rem'
            }}>
              ✨ Interactividad
            </h3>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
              Pasa el cursor sobre los logos y elementos del menú para ver todas las animaciones y efectos premium implementados.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NavigationDemo;
