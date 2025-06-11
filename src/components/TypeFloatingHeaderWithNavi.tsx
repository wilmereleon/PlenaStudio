import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TypeFloatingHeaderWithNavi.module.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export type TypeFloatingHeaderWithNaviType = {
  className?: string;
};

const TypeFloatingHeaderWithNavi: FunctionComponent<
  TypeFloatingHeaderWithNaviType
> = ({ className = "" }) => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header
      className={[styles.typefloatingHeaderWithNavi, className].join(" ")}
    >
      <div className={styles.brandDeMarcaYLogo}>
        <img className={styles.icon} loading="lazy" alt="" src="/icon@2x.png" />
        <img className={styles.icon1} alt="" src="/icon-1@2x.png" />
      </div>
      <div className={styles.contornoDeEncabezado}>
        <div className={styles.enlacesDeNavegacin}>
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
                  borderRadius: "8px", // Cambiado a 8px
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
      </div>
    </header>
  );
};

export default TypeFloatingHeaderWithNavi;