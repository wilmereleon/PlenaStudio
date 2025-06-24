import { useContext } from "react";
import TypeFloatingHeaderWithNavi from "../components/TypeFloatingHeaderWithNavi";
import TypeStackedSimpleFooter from "../components/TypeStackedSimpleFooter";
import { CartContext } from "../context/CartContext"; // Debes tener un contexto de carrito
import styles from "./ShoppingCart.module.css"; // Crea este archivo para los estilos

const ShoppingCart = () => {
  const { cartItems, updateQuantity, removeItem, subtotal, total, applyDiscount, checkout } = useContext(CartContext);

  return (
    <div>
      <TypeFloatingHeaderWithNavi />
      <main className={styles.main}>
        <h1 className={styles.title}>Tu carrito de compras</h1>
        <p className={styles.subtitle}>Revise los artículos seleccionados antes de proceder al pago</p>
        <div className={styles.actions}>
          <button className={styles.secondaryButton} onClick={() => window.location.href = "/catalogo"}>Continúa comprando</button>
          <button className={styles.primaryButton} onClick={checkout}>Pagar</button>
        </div>

        <section className={styles.cartSection}>
          <h2 className={styles.sectionTitle}>Ítems en carrito</h2>
          <div className={styles.cartActions}>
            <button className={styles.secondaryButton}>Actualiza cantidad</button>
            <button className={styles.secondaryButton}>Remueve selección</button>
          </div>
          <div className={styles.itemsGrid}>
            {cartItems.length === 0 ? (
              <div>No hay productos en el carrito</div>
            ) : (
              cartItems.map(item => (
                <div className={styles.itemCard} key={item.productId}>
                  <img src={`/InsumosIMG/${item.imagen}`} alt={item.nombre} className={styles.itemImage} />
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.nombre}</div>
                    <div className={styles.itemDesc}>{item.descripcion}</div>
                    <div className={styles.itemPrice}>${item.precio.toLocaleString()}</div>
                    <input
                      type="number"
                      min={1}
                      value={item.cantidad}
                      onChange={e => updateQuantity(item.productId, Number(e.target.value))}
                      className={styles.quantityInput}
                    />
                    <button className={styles.removeButton} onClick={() => removeItem(item.productId)}>Eliminar</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className={styles.totalSection}>
          <h2 className={styles.sectionTitle}>Total</h2>
          <p>El importe total incluyendo impuestos es:</p>
          <div className={styles.totalAmount}>${total.toLocaleString()}</div>
          <div className={styles.actions}>
            <button className={styles.secondaryButton} onClick={applyDiscount}>Aplicar descuento</button>
            <button className={styles.primaryButton} onClick={checkout}>Pagar ahora</button>
          </div>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryTitle}>Subtotal</div>
              <div>${subtotal.toLocaleString()}</div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryTitle}>Envío</div>
              <div>Envío gratis compras superiores a $100.000</div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryTitle}>Total a pagar</div>
              <div>${total.toLocaleString()}</div>
            </div>
          </div>
        </section>
      </main>
      <TypeStackedSimpleFooter />
    </div>
  );
};

export default ShoppingCart;