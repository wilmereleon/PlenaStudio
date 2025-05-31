import { FunctionComponent } from "react";
import styles from "./Property1SoftwareHeroTripl.module.css";

export type Property1SoftwareHeroTriplType = {
  className?: string;
};

const Property1SoftwareHeroTripl: FunctionComponent<
  Property1SoftwareHeroTriplType
> = ({ className = "" }) => {
  return (
    <section
      className={[styles.property1softwareHeroTripl, className].join(" ")}
    >
      <div className={styles.wrapper}>
        <section className={styles.copyContainer}>
          <div className={styles.copyComponent}>
            <div className={styles.headingText}>
              <h1 className={styles.heading}>
                Manténgase actualizado con nuestras noticias
              </h1>
              <h3 className={styles.subheading}>
                Suscríbete para recibir las últimas actualizaciones y consejos.
              </h3>
            </div>
            <div className={styles.buttonCombo}>
              <div className={styles.ctaButton}>
                <div className={styles.textContainer}>
                  <b className={styles.cta}>Leer más</b>
                </div>
              </div>
              <div className={styles.secondaryButton}>
                <div className={styles.textContainer1}>
                  <div className={styles.cta}>Obtenga más información</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.mediaLayouts}>
          <div className={styles.logoBar}>
            <div className={styles.logoBarChild} />
            <img className={styles.deviceIcon} alt="" src="/device@2x.png" />
            <div className={styles.deviceContainer}>
              <div className={styles.device}>
                <img
                  className={styles.iphone14Starlight1}
                  alt=""
                  src="/iphone-14--starlight-1@2x.png"
                />
                <img
                  className={styles.screenContentImageLummi}
                  alt=""
                  src="/screen-content-image--lummi@2x.png"
                />
              </div>
            </div>
            <img className={styles.deviceIcon1} alt="" src="/device-1@2x.png" />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Property1SoftwareHeroTripl;
