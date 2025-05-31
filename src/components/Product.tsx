import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Product.module.css";

export type ProductType = {
  className?: string;
  nathanDumlaoKixfBEdypUnsplash?: string;

  /** Style props */
  emptyInfoHeight?: CSSProperties["height"];
  emptyInfoDisplay?: CSSProperties["display"];
};

const Product: FunctionComponent<ProductType> = ({
  className = "",
  nathanDumlaoKixfBEdypUnsplash,
  emptyInfoHeight,
  emptyInfoDisplay,
}) => {
  const emptyInfoStyle: CSSProperties = useMemo(() => {
    return {
      height: emptyInfoHeight,
      display: emptyInfoDisplay,
    };
  }, [emptyInfoHeight, emptyInfoDisplay]);

  return (
    <section className={[styles.product1, className].join(" ")}>
      <img
        className={styles.nathanDumlaoKixfbedyp64UnspIcon}
        loading="lazy"
        alt=""
        src={nathanDumlaoKixfBEdypUnsplash}
      />
      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className={styles.areteArlequeenRf200}>Arete Arlequeen RF-200</h3>
          <b className={styles.emptyInfo} style={emptyInfoStyle}>
            $125.300
          </b>
        </div>
        <div className={styles.enlaceACarritoYMeGusta}>
          <img className={styles.cartIcon} alt="" src="/cart-1.svg" />
          <img
            className={styles.heartIcon}
            loading="lazy"
            alt=""
            src="/heart.svg"
          />
        </div>
        <div className={styles.compra}>
          <div className={styles.comprar}>
            <b className={styles.comprar1}>COMPRAR</b>
          </div>
          <div className={styles.aadirACarro}>
            <div className={styles.comprar1}>AÑADIR A CARRO</div>
          </div>
          <div className={styles.cantidad}>
            <b className={styles.comprar1}>CANTIDAD: 1</b>
            <img
              className={styles.chevronDownIcon}
              alt=""
              src="/chevrondown.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
