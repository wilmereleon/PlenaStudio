import { FunctionComponent, useMemo, type CSSProperties } from "react";
import { useCart } from "../context/CartContext";
import { type Producto } from "../types/productos";
import styles from "./Product.module.css";
import OptimizedImage from "./OptimizedImage";

/**
 * ProductType
 * 
 * Tipado de las props que recibe el componente Product.
 * 
 * @property {string} [className] - Clase CSS adicional para el componente.
 * @property {string} [nathanDumlaoKixfBEdypUnsplash] - Ruta de la imagen del producto.
 * @property {Producto} [producto] - Datos del producto del contexto.
 * @property {CSSProperties["height"]} [emptyInfoHeight] - Altura personalizada para el precio.
 * @property {CSSProperties["display"]} [emptyInfoDisplay] - Display personalizado para el precio.
 */
export type ProductType = {
  className?: string;
  nathanDumlaoKixfBEdypUnsplash?: string;
  producto?: Producto;

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
  producto,
  emptyInfoHeight,
  emptyInfoDisplay,
}) => {
  const { addItem } = useCart();

  /**
   * Memoiza los estilos personalizados para el precio.
   */
  const emptyInfoStyle: CSSProperties = useMemo(() => {
    return {
      height: emptyInfoHeight,
      display: emptyInfoDisplay,
    };
  }, [emptyInfoHeight, emptyInfoDisplay]);

  // Usar datos del producto si está disponible, sino valores por defecto
  const productName = producto?.nombre || "Arete Arlequeen RF-200";
  const productPrice = producto?.precio || 125300;
  const formattedPrice = `$${productPrice.toLocaleString()}`;

  const handleAddToCart = () => {
    if (producto) {
      addItem(producto, 1);
    }
  };

  const handleBuyNow = () => {
    if (producto) {
      addItem(producto, 1);
      // Redirigir al carrito de compras
      window.location.href = '/shopping-cart';
    }
  };

  return (
    <section className={[styles.product1, className].join(" ")}>
      {/* Imagen del producto */}
      <OptimizedImage
        src={nathanDumlaoKixfBEdypUnsplash || "/nathandumlaokixfbedyp64unsplash@2x.png"}
        alt={productName}
        className={styles.nathanDumlaoKixfbedyp64UnspIcon}
        loading="lazy"
        sizes="(max-width: 576px) 260px, (max-width: 768px) 300px, (max-width: 1024px) 400px, 600px"
      />
      <div className={styles.content}>
        <div className={styles.info}>
          {/* Nombre del producto */}
          <h3 className={styles.areteArlequeenRf200}>{productName}</h3>
          {/* Precio del producto */}
          <b className={styles.emptyInfo} style={emptyInfoStyle}>
            {formattedPrice}
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
          <div className={styles.productActions}>
            <button 
              className={styles.addToCartBtn}
              onClick={handleAddToCart}
              disabled={!producto}
            >
              Añadir al Carrito
            </button>
            <button 
              className={styles.buyNowBtn}
              onClick={handleBuyNow}
              disabled={!producto}
            >
              Comprar Ahora
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Product;