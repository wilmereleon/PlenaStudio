import { FunctionComponent } from "react";
import styles from "./TypeSubscribePillInputCT.module.css";

export type TypeSubscribePillInputCTType = {
  className?: string;
};

const TypeSubscribePillInputCT: FunctionComponent<
  TypeSubscribePillInputCTType
> = ({ className = "" }) => {
  return (
    <section className={[styles.typesubscribePillInputCt, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.copyComponent}>
          <div className={styles.headingText}>
            <h1 className={styles.heading}>
              ¡Suscríbete a nuestro boletín hoy!
            </h1>
            <div className={styles.subheading}>
              Manténgase informado con nuestras últimas novedades y ofertas.
            </div>
          </div>
          <div className={styles.inputButtonCombo}>
            <div className={styles.input}>
              <div className={styles.inputForm}>
                <div className={styles.textContainer}>
                  <div className={styles.placeholderText}>
                    Introduce tu dirección de correo electrónico
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.button}>
              <div className={styles.textContainer1}>
                <div className={styles.cta}>Subscríbete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypeSubscribePillInputCT;
