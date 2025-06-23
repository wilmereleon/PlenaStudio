import { FunctionComponent, useState, useEffect } from "react";
import Product from "./Product";
import { productosDisponibles, type Producto } from "../types/productos";
import styles from "./Property1CardsPopularProdu.module.css";

export type Property1CardsPopularProduType = {
  className?: string;
};

const Property1CardsPopularProdu: FunctionComponent<
  Property1CardsPopularProduType
> = ({ className = "" }) => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 6; // Mostrar 6 productos por página

  useEffect(() => {
    // Simular carga inicial de productos
    setLoading(true);
    setTimeout(() => {
      const initialProducts = productosDisponibles.slice(0, productsPerPage);
      setProducts(initialProducts);
      setLoading(false);
    }, 500);
  }, []);

  const loadMoreProducts = () => {
    setLoading(true);
    setTimeout(() => {
      const startIndex = currentPage * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const newProducts = productosDisponibles.slice(startIndex, endIndex);
      
      if (newProducts.length > 0) {
        setProducts(prev => [...prev, ...newProducts]);
        setCurrentPage(prev => prev + 1);
      }
      setLoading(false);
    }, 500);
  };

  const hasMoreProducts = products.length < productosDisponibles.length;

  return (
    <main className={[styles.property1cardsPopularProdu, className].join(" ")}>
      <h1 className={styles.heading}>Accesorios populares</h1>
      <div className={styles.productsGriid}>
        {products.map((producto) => (
          <Product 
            key={producto.productId}
            producto={producto}
            nathanDumlaoKixfBEdypUnsplash={`/InsumosIMG/${producto.imagen}`}
          />
        ))}
      </div>
      
      {/* Botón de cargar más productos */}
      {hasMoreProducts && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '40px',
          marginBottom: '20px'
        }}>
          <button
            onClick={loadMoreProducts}
            disabled={loading}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontFamily: 'var(--font-lato)',
              backgroundColor: 'var(--color-lightgreen)',
              color: 'white',
              border: '1px solid var(--color-darkslategray-100)',
              borderRadius: 'var(--br-8)',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s ease',
              minHeight: '44px',
              minWidth: '120px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#7bb86f';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = 'var(--color-lightgreen)';
              }
            }}
          >
            {loading ? 'Cargando...' : 'Cargar más productos'}
          </button>
        </div>
      )}
    </main>
  );
};

export default Property1CardsPopularProdu;
