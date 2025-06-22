import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TypeFloatingHeaderWithNavi.module.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../context/CartContext'; // Importa el hook del carrito

export type TypeFloatingHeaderWithNaviType = {
  className?: string;
};

const TypeFloatingHeaderWithNavi: FunctionComponent<
  TypeFloatingHeaderWithNaviType
> = ({ className = "" }) => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { cartItems } = useCart(); // Obtén los items del carrito

  // Suma total de artículos en el carrito
  const totalArticulos = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <header
      className={[styles.typefloatingHeaderWithNavi, className].join(" ")}
    >
      <div className={styles.brandDeMarcaYLogo}>
        <img className={styles.icon} loading="lazy" alt="" src="/icon@2x.png" />
        <img className={styles.icon1} alt="" src="/icon-1@2x.png" />
      </div>
      <div className={styles.contornoDeEncabezado}>
        <nav className={styles.enlacesDeNavegacin}>
          <Link to="/" className={styles.inicioTexto}>Inicio</Link>
          <Link to="/combinaciones" className={styles.inicioTexto}>Combinaciones</Link>
          <Link to="/aretes" className={styles.inicioTexto}>Aretes</Link>
          <Link to="/anillos" className={styles.inicioTexto}>Anillos</Link>
          <Link to="/pulseras" className={styles.inicioTexto}>Pulseras</Link>
          <Link to="/bufandas" className={styles.inicioTexto}>Bufandas</Link>
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
              onClick={() => navigate("/shopping-cart")}
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
    </header>
  );
};

export default TypeFloatingHeaderWithNavi;