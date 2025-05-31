import { FunctionComponent } from "react";
import styles from "./TypeFloatingHeaderWithNavi.module.css";

export type TypeFloatingHeaderWithNaviType = {
  className?: string;
};

const TypeFloatingHeaderWithNavi: FunctionComponent<
  TypeFloatingHeaderWithNaviType
> = ({ className = "" }) => {
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
          <div className={styles.botonInicioSesion}>
            <div className={styles.contenedorDeTexto}>
              <div className={styles.inicioTexto}>Iniciar sesión</div>
            </div>
          </div>
          <div className={styles.botonRegistrate}>
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
