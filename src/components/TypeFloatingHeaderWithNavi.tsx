import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TypeFloatingHeaderWithNavi.module.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../context/CartContext'; // Importa el hook del carrito
import OptimizedImage from './OptimizedImage';

export type TypeFloatingHeaderWithNaviType = {
  className?: string;
};

const TypeFloatingHeaderWithNavi: FunctionComponent<
  TypeFloatingHeaderWithNaviType
> = ({ className = "" }) => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { cartItems } = useCart(); // Obtén los items del carrito
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Suma total de artículos en el carrito
  const totalArticulos = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={[styles.typefloatingHeaderWithNavi, className].join(" ")}
    >
      <div className={styles.brandDeMarcaYLogo}>
        <OptimizedImage 
          src="/icon@2x.png" 
          alt="Plena Studio Logo" 
          className={styles.icon} 
          loading="eager"
          sizes="(max-width: 576px) 200px, 284px"
        />
        <OptimizedImage 
          src="/icon-1@2x.png" 
          alt="Plena Studio Icon" 
          className={styles.icon1} 
          loading="eager"
          sizes="(max-width: 576px) 60px, 73px"
        />
      </div>
      <div className={styles.contornoDeEncabezado}>
        {/* Hamburger button for mobile */}
        <button 
          className={styles.hamburgerButton}
          onClick={toggleMenu}
          aria-label="Menú de navegación"
        >
          <div className={`${styles.hamburgerIcon} ${isMenuOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <nav className={styles.enlacesDeNavegacin}>
          <Link to="/" className={styles.inicioTexto}>Inicio</Link>
          <Link to="/combinaciones" className={styles.inicioTexto}>Combinaciones</Link>
          <Link to="/aretes" className={styles.inicioTexto}>Aretes</Link>
          <Link to="/anillos" className={styles.inicioTexto}>Anillos</Link>
          <Link to="/pulseras" className={styles.inicioTexto}>Pulseras</Link>
          <Link to="/bufandas" className={styles.inicioTexto}>Bufandas</Link>
          <Link to="/catalogo" className={styles.inicioTexto}>Catálogo</Link>
          <img
            className={styles.searchSharpIcon}
            loading="lazy"
            alt="Buscar"
            src="/searchsharp.svg"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/buscar")}
          />
          {/* Icono de carrito con badge */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              className={styles.searchSharpIcon}
              loading="lazy"
              alt="Carrito"
              src="/cart.svg"
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log("🛒 Cart button clicked - navigating to /shopping-cart");
                navigate("/shopping-cart");
              }}
            />
            {totalArticulos > 0 && (
              <span className={styles.cartBadge}>{totalArticulos}</span>
            )}
          </div>
        </nav>
        <div className="d-flex align-items-center">
          {isAuthenticated ? (
            <div className="d-flex align-items-center">
              <span className="me-3 text-muted">
                <i className="bi bi-person-circle me-1"></i>
                Hola, {user?.nombre}
              </span>
              <button 
                onClick={logout}
                className="btn btn-outline-secondary btn-sm"
                style={{
                  borderColor: 'var(--color-slategray)',
                  color: 'var(--color-slategray)'
                }}
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className={styles.botonInicioSesion}
              style={{
                height: "40px",
                minWidth: "120px",
                backgroundColor: "#e6fcf3",
                color: "#2C3E50",
                border: "1px solid #232c2b",
                borderRadius: "8px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 20px",
                fontSize: "12px",
                fontFamily: "Lato, Arial, sans-serif",
                fontWeight: 400,
                boxShadow: "none",
                textAlign: "center",
                transition: "none",
                textDecoration: "none"
              }}
            >
              Iniciar sesión
            </Link>
          )}
        </div>
        <div
          className={styles.botonRegistrate}
          onClick={() => navigate("/register")}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.contenedorDeTexto}>
            <b className={styles.inicioTexto}>Registrarse</b>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <nav className={styles.mobileNavLinks}>
          <Link 
            to="/" 
            className={styles.mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="bi bi-house-door me-2"></i>Inicio
          </Link>
          <Link 
            to="/combinaciones" 
            className={styles.mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="bi bi-palette me-2"></i>Combinaciones
          </Link>
          <Link 
            to="/aretes" 
            className={styles.mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="bi bi-gem me-2"></i>Aretes
          </Link>
          <Link 
            to="/anillos" 
            className={styles.mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="bi bi-circle me-2"></i>Anillos
          </Link>
          <Link 
            to="/pulseras" 
            className={styles.mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="bi bi-watch me-2"></i>Pulseras
          </Link>
          <Link 
            to="/bufandas" 
            className={styles.mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="bi bi-wind me-2"></i>Bufandas
          </Link>
          <Link 
            to="/catalogo" 
            className={styles.mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="bi bi-grid me-2"></i>Catálogo
          </Link>
        </nav>

        <div className={styles.mobileActions}>
          <button 
            className={styles.mobileSearchButton}
            onClick={() => {
              navigate("/buscar");
              setIsMenuOpen(false);
            }}
          >
            <i className="bi bi-search"></i>
            <span>Buscar</span>
          </button>
          
          <button 
            className={styles.mobileCartButton}
            onClick={() => {
              console.log("🛒 Mobile cart button clicked - navigating to /shopping-cart");
              navigate("/shopping-cart");
              setIsMenuOpen(false);
            }}
          >
            <i className="bi bi-cart"></i>
            <span>Carrito ({totalArticulos})</span>
          </button>

          {isAuthenticated ? (
            <div style={{ marginTop: '20px', padding: '15px 0', borderTop: '1px solid #f0f0f0' }}>
              <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                <i className="bi bi-person-circle me-2"></i>
                Hola, {user?.nombre}
              </div>
              <button 
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#f8fafb',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div style={{ marginTop: '20px', padding: '15px 0', borderTop: '1px solid #f0f0f0' }}>
              <button 
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#e6fcf3',
                  border: '1px solid #232c2b',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginBottom: '10px',
                  fontSize: '14px'
                }}
              >
                Iniciar Sesión
              </button>
              <button 
                onClick={() => {
                  navigate("/register");
                  setIsMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#8ABF69',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Registrarse
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      <div 
        className={`${styles.overlay} ${isMenuOpen ? styles.open : ''}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
    </header>
  );
};

export default TypeFloatingHeaderWithNavi;