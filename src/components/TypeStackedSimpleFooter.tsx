import { FunctionComponent } from "react";
import styles from "./TypeStackedSimpleFooter.module.css";

export type TypeStackedSimpleFooterType = {
  className?: string;
};

const TypeStackedSimpleFooter: FunctionComponent<
  TypeStackedSimpleFooterType
> = ({ className = "" }) => {
  return (
    <footer className={[styles.typestackedSimpleFooter, className].join(" ")}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <h3 className={styles.brandname}>Equipo PlenaStudio.co</h3>
        </div>
        <div className={styles.links}>
          <h3 className={styles.link}>Sobre nosotros</h3>
          <h3 className={styles.link}>Nuestro trabajo</h3>
          <h3 className={styles.link}>LinkedIn</h3>
          <h3 className={styles.link}>Contáctanos</h3>
        </div>
      </div>
      <div className={styles.credits}>
        <div className={styles.divider} />
        <div className={styles.row}>
          <div className={styles.brandNameAll}>
            © 2025 PlenaStudio. Todos los derechos reservados.
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.link4}>Política de privacidad</div>
            <div className={styles.link4}>Términos del servicio</div>
            <div className={styles.link4}>Configuración de cookies</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TypeStackedSimpleFooter;
