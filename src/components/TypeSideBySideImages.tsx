import { FunctionComponent } from "react";
import styles from "./TypeSideBySideImages.module.css";

export type TypeSideBySideImagesType = {
  className?: string;
};

const TypeSideBySideImages: FunctionComponent<TypeSideBySideImagesType> = ({
  className = "",
}) => {
  return (
    <section className={[styles.typesideBySideImages, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>Combo aretes y bufanda</h1>
          <h1 className={styles.subheading}>
            <span>50 %</span>
            <span> de descuento total en los dos accesorios</span>
          </h1>
        </div>
        <section className={styles.featureGrid}>
          <div className={styles.cards}>
            <img
              className={styles.imageLummi}
              loading="lazy"
              alt=""
              src="/image--lummi@2x.png"
            />
            <div className={styles.copy}>
              <h3 className={styles.featureTitle}>
                Bufanda FLORES translucid + Aretes HOJAS
              </h3>
              <div className={styles.featureDescription}>Precio</div>
              <div className={styles.featureDescription1}>
                <span>
                  <span className={styles.antes}>ANTES:</span>
                  <span className={styles.span}>
                    {` `}
                    <span className={styles.span1}>$182 000</span>
                  </span>
                  <span className={styles.span}>{`  `}</span>
                  <span className={styles.span}>AHORA:</span>
                  <span className={styles.span}>{` `}</span>
                </span>
                <span className={styles.span4}>$91 000</span>
              </div>
              <div className={styles.botonAgregarCarrito}>
                <div className={styles.contenenedorDeTexto}>
                  <b className={styles.agregarAlCarrito}>AGREGAR AL CARRITO</b>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default TypeSideBySideImages;
