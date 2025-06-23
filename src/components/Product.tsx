import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Product.module.css";
import OptimizedImage from "./OptimizedImage";

/**
 * ProductType
 * 
 * Tipado de las props que recibe el componente Product.
 * 
 * @property {string} [className] - Clase CSS adicional para el componente.
 * @property {string} [nathanDumlaoKixfBEdypUnsplash] - Ruta de la imagen del producto.
 * @property {CSSProperties["height"]} [emptyInfoHeight] - Altura personalizada para el precio.
 * @property {CSSProperties["display"]} [emptyInfoDisplay] - Display personalizado para el precio.
 */
export type ProductType = {
  className?: string;
  nathanDumlaoKixfBEdypUnsplash?: string;

  /** Style props */
  emptyInfoHeight?: CSSProperties["height"];
  emptyInfoDisplay?: CSSProperties["display"];
};

/**
 * Product
 * 
 * Componente que muestra la información de un producto en el catálogo de Plena Studio.
 * Incluye imagen, nombre, precio, botones de compra y acciones rápidas.
 * 
 * @component
 * 
 * @param {ProductType} props - Propiedades del componente.
 * @param {string} [props.className] - Clase CSS adicional.
 * @param {string} [props.nathanDumlaoKixfBEdypUnsplash] - Imagen del producto.
 * @param {CSSProperties["height"]} [props.emptyInfoHeight] - Altura personalizada para el precio.
 * @param {CSSProperties["display"]} [props.emptyInfoDisplay] - Display personalizado para el precio.
 * 
 * @returns {JSX.Element} Sección con la información y acciones del producto.
 */
const Product: FunctionComponent<ProductType> = ({
  className = "",
  nathanDumlaoKixfBEdypUnsplash,
  emptyInfoHeight,
  emptyInfoDisplay,
}) => {
  /**
   * Memoiza los estilos personalizados para el precio.
   */
  const emptyInfoStyle: CSSProperties = useMemo(() => {
    return {
      height: emptyInfoHeight,
      display: emptyInfoDisplay,
    };
  }, [emptyInfoHeight, emptyInfoDisplay]);

  return (
    <section className={[styles.product1, className].join(" ")}>
      {/* Imagen del producto */}
      <OptimizedImage
        src={nathanDumlaoKixfBEdypUnsplash || "/nathandumlaokixfbedyp64unsplash@2x.png"}
        alt="Arete Arlequeen RF-200"
        className={styles.nathanDumlaoKixfbedyp64UnspIcon}
        loading="lazy"
        sizes="(max-width: 576px) 260px, (max-width: 768px) 300px, (max-width: 1024px) 400px, 600px"
      />
      <div className={styles.content}>
        <div className={styles.info}>
          {/* Nombre del producto */}
          <h3 className={styles.areteArlequeenRf200}>Arete Arlequeen RF-200</h3>
          {/* Precio del producto */}
          <b className={styles.emptyInfo} style={emptyInfoStyle}>
            $125.300
          </b>
        </div>
        {/* Iconos de carrito y favorito */}
        <div className={styles.enlaceACarritoYMeGusta}>
          <img className={styles.cartIcon} alt="" src="/cart-1.svg" />
          <img
            className={styles.heartIcon}
            loading="lazy"
            alt=""
            src="/heart.svg"
          />
        </div>
        {/* Acciones de compra */}
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