import { FunctionComponent } from "react";
import TypeFloatingHeaderWithNavi from "../components/TypeFloatingHeaderWithNavi";
import TypeSideBySideImages from "../components/TypeSideBySideImages";
import Property1CardsPopularProdu from "../components/Property1CardsPopularProdu";
import Property1SoftwareHeroTripl from "../components/Property1SoftwareHeroTripl";
import TypeSubscribePillInputCT from "../components/TypeSubscribePillInputCT";
import TypeStackedSimpleFooter from "../components/TypeStackedSimpleFooter";
import styles from "./PginaWeb.module.css";

const PginaWeb: FunctionComponent = () => {
  return (
    <div className={styles.pginaWeb}>
      <section className={styles.informadorDeEventos}>
        <div className={styles.tickerWrapper}>
          <div className={styles.ticker}>
            <span className={styles.tickerText}>
              ENVÍOS GRATIS A TODA COLOMBIA POR COMPRAS SUPERIORES A $100 000
            </span>
          </div>
        </div>
      </section>
      {/* Línea divisoria */}
      <hr className={styles.divisoria} />
      <TypeFloatingHeaderWithNavi />
      <section className={styles.content}>
        <div className={styles.textContainer}>
          <h2 className={styles.figmaIpsumComponent}>
            Plena Studio: Expresa tu esencia, redefine tu estilo
          </h2>
        </div>
        <img
          className={styles.videoContainerIcon}
          loading="lazy"
          alt=""
          src="/video-container@2x.png"
        />
      </section>
      <TypeSideBySideImages />
      <Property1CardsPopularProdu />
      <Property1SoftwareHeroTripl />
      <TypeSubscribePillInputCT />
      <TypeStackedSimpleFooter />
    </div>
  );
};

export default PginaWeb;