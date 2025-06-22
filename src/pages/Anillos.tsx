import { useCart } from "../context/CartContext";
import TypeFloatingHeaderWithNavi from "../components/TypeFloatingHeaderWithNavi";
import TypeStackedSimpleFooter from "../components/TypeStackedSimpleFooter";
import styles from "./Catalogo.module.css";

const productosAnillos = [
  { productId: "3", nombre: "Anillo Aurora Plateado", descripcion: "Anillo Aurora Plateado", precio: 24000, imagen: "ring01.jpeg" },
  { productId: "4", nombre: "Anillo Esencia Minimalista", descripcion: "Anillo Esencia Minimalista", precio: 22000, imagen: "ring02.jpeg" },
  { productId: "5", nombre: "Anillo Corazón de Plata", descripcion: "Anillo Corazón de Plata", precio: 26000, imagen: "ring03.jpeg" },
];

const Anillos = () => {
  const { addItem } = useCart();

  return (
    <div>
      <TypeFloatingHeaderWithNavi />
      <main className={styles.main}>
        <h1 className={styles.title}>Anillos</h1>
        <div className="row">
          {productosAnillos.map(producto => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={producto.productId}>
              <div className={`card ${styles.productCard}`}>
                <img
                  src={`/InsumosIMG/${producto.imagen}`}
                  className="card-img-top"
                  alt={producto.nombre}
                  style={{ height: 200, objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">{producto.descripcion}</p>
                  <p className="card-text fw-bold">${producto.precio.toLocaleString()}</p>
                  <button
                    className="btn"
                    style={{ background: "#7bb86f", color: "#fff" }}
                    onClick={() => addItem(producto)}
                  >
                    <i className="bi bi-cart-plus"></i> Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <TypeStackedSimpleFooter />
    </div>
  );
};

export default Anillos;