import { useCart } from "../context/CartContext";
import TypeFloatingHeaderWithNavi from "../components/TypeFloatingHeaderWithNavi";
import TypeStackedSimpleFooter from "../components/TypeStackedSimpleFooter";
import styles from "./Catalogo.module.css";

const productosBufandas = [
  { productId: "7", nombre: "Aretes Perla Elegante", descripcion: "Aretes Perla Elegante", precio: 34000, imagen: "womenEarring01.jpeg" },
  { productId: "21", nombre: "Aretes Fiesta de Color", descripcion: "Aretes Fiesta de Color", precio: 34000, imagen: "womenEarring14.jpeg" },
];

const Bufandas = () => {
  const { addItem } = useCart();

  return (
    <div>
      <TypeFloatingHeaderWithNavi />
      <main className={styles.main}>
        <h1 className={styles.title}>Bufandas</h1>
        <div className="row">
          {productosBufandas.map(producto => (
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

export default Bufandas;