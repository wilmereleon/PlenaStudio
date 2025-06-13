import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TypeFloatingHeaderWithNavi.module.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * TypeFloatingHeaderWithNaviType
 * 
 * Tipado de las props que recibe el componente TypeFloatingHeaderWithNavi.
 * 
 * @property {string} [className] - Clase CSS adicional para el componente.
 */
export type TypeFloatingHeaderWithNaviType = {
  className?: string;
};

/**
 * TypeFloatingHeaderWithNavi
 * 
 * Componente de encabezado flotante con navegación para Plena Studio.
 * Muestra el logo, enlaces de navegación, iconos de búsqueda y carrito, y botones de autenticación.
 * 
 * @component
 * 
 * @param {TypeFloatingHeaderWithNaviType} props - Propiedades del componente.
 * @param {string} [props.className] - Clase CSS adicional.
 * 
 * @returns {JSX.Element} El encabezado de navegación.
 */
const TypeFloatingHeaderWithNavi: FunctionComponent<
  TypeFloatingHeaderWithNaviType
> = ({ className = "" }) => {
  // Hook para navegación programática
  const navigate = useNavigate();
  // Hook de autenticación personalizada
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header
      className={[styles.typefloatingHeaderWithNavi, className].join(" ")}
    >
      {/* Logo de la marca */}
      <div className={styles.brandDeMarcaYLogo}>
        <img className={styles.icon} loading="lazy" alt="" src="/icon@2x.png" />
        <img className={styles.icon1} alt="" src="/icon-1@2x.png" />
      </div>
      <div className={styles.contornoDeEncabezado}>
        <div className={styles.enlacesDeNavegacin}>
          {/* Enlaces de navegación principales */}
          <div className={styles.inicio}>
            <div className={styles.inicioTexto}>Inicio</div>
          </div>
          <div className={styles.inicio}>
            <div className={styles.inicioTexto}>Combinaciones</div>
          </div>
          <div className={styles.aretes}>
            <div className={styles.inicioTexto}>Aretes</div>
          </div>
          <div className={styles.inicio}>
            <div className={styles.inicioTexto}>Anillos</div>
          </div>
          <div className={styles.aretes}>
            <div className={styles.inicioTexto}>Pulseras</div>
          </div>
          <div className={styles.bufandas}>
            <div className={styles.inicioTexto}>Bufandas</div>
          </div>
          {/* Iconos de búsqueda y carrito */}
          <img
            className={styles.searchSharpIcon}
            loading="lazy"
            alt=""
            src="/searchsharp.svg"
          />
          <img
            className={styles.searchSharpIcon}
            loading="lazy"
            alt=""
            src="/cart.svg"
          />
          {/* Botones de autenticación */}
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
          {/* Botón de registro */}
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
      </div>
    </header>
  );
};

export default TypeFloatingHeaderWithNavi;