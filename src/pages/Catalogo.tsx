import { FunctionComponent, useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { productosDisponibles, type Producto } from "../types/productos";
import TypeFloatingHeaderWithNavi from "../components/TypeFloatingHeaderWithNavi";
import TypeStackedSimpleFooter from "../components/TypeStackedSimpleFooter";
import Product from "../components/Product";
import OptimizedImage from "../components/OptimizedImage";
import styles from "./Catalogo.module.css";

const Catalogo: FunctionComponent = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Producto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const productsPerPage = 12;
  // Categorías de productos
  const categories = [
    { id: "todos", name: "Todos los productos", count: productosDisponibles.length },
    { id: "aretes", name: "Aretes", count: productosDisponibles.filter((p: Producto) => p.nombre.toLowerCase().includes("arete")).length },
    { id: "anillos", name: "Anillos", count: productosDisponibles.filter((p: Producto) => p.nombre.toLowerCase().includes("anillo")).length },
  ];

  // Filtrar productos por categoría
  const getFilteredProducts = (category: string) => {
    if (category === "todos") return productosDisponibles;
    if (category === "aretes") return productosDisponibles.filter((p: Producto) => p.nombre.toLowerCase().includes("arete"));
    if (category === "anillos") return productosDisponibles.filter((p: Producto) => p.nombre.toLowerCase().includes("anillo"));
    return productosDisponibles;
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const filteredProducts = getFilteredProducts(selectedCategory);
      const initialProducts = filteredProducts.slice(0, productsPerPage);
      setProducts(initialProducts);
      setCurrentPage(1);
      setLoading(false);
    }, 300);
  }, [selectedCategory]);

  const loadMoreProducts = () => {
    setLoading(true);
    setTimeout(() => {
      const filteredProducts = getFilteredProducts(selectedCategory);
      const startIndex = currentPage * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const newProducts = filteredProducts.slice(startIndex, endIndex);
      
      if (newProducts.length > 0) {
        setProducts(prev => [...prev, ...newProducts]);
        setCurrentPage(prev => prev + 1);
      }
      setLoading(false);
    }, 300);
  };

  const hasMoreProducts = () => {
    const filteredProducts = getFilteredProducts(selectedCategory);
    return products.length < filteredProducts.length;
  };

  // Funciones para el slider horizontal (desktop)
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (producto: Producto) => {
    addItem(producto, 1);
  };

  const handleBuyNow = (producto: Producto) => {
    addItem(producto, 1);
    window.location.href = '/shopping-cart';
  };

  return (
    <div>
      <TypeFloatingHeaderWithNavi />
      
      <main className={styles.main}>
        {/* Header del catálogo */}
        <div className={styles.catalogHeader}>
          <h1 className={styles.title}>Catálogo de Productos</h1>
          <p className={styles.subtitle}>Descubre nuestra colección completa de accesorios únicos</p>
        </div>

        {/* Filtros por categoría */}
        <div className={styles.categoriesContainer}>
          <h2 className={styles.categoriesTitle}>Categorías</h2>
          <div className={styles.categoriesGrid}>
            {categories.map(category => (
              <button
                key={category.id}
                className={`${styles.categoryCard} ${selectedCategory === category.id ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className={styles.categoryName}>{category.name}</span>
                <span className={styles.categoryCount}>({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Vista Desktop - Slider horizontal */}
        <div className={styles.desktopView}>
          <div className={styles.sliderContainer}>
            <button className={styles.sliderButton + ' ' + styles.sliderButtonLeft} onClick={scrollLeft}>
              &#8249;
            </button>
            <div className={styles.productsSlider} ref={sliderRef}>
              {products.map((producto) => (
                <div key={producto.productId} className={styles.productSlide}>
                  <div className={styles.productCardSlider}>
                    <OptimizedImage
                      src={`/InsumosIMG/${producto.imagen}`}
                      alt={producto.nombre}
                      className={styles.productImage}
                      loading="lazy"
                      sizes="(max-width: 576px) 200px, (max-width: 768px) 250px, 300px"
                    />
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>{producto.nombre}</h3>
                      <p className={styles.productDescription}>{producto.descripcion}</p>
                      <p className={styles.productPrice}>${producto.precio.toLocaleString()}</p>
                      <div className={styles.productActions}>
                        <button 
                          className={styles.addToCartBtn}
                          onClick={() => handleAddToCart(producto)}
                        >
                          Añadir al Carrito
                        </button>
                        <button 
                          className={styles.buyNowBtn}
                          onClick={() => handleBuyNow(producto)}
                        >
                          Comprar Ahora
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.sliderButton + ' ' + styles.sliderButtonRight} onClick={scrollRight}>
              &#8250;
            </button>
          </div>
        </div>

        {/* Vista Mobile - Grid vertical */}
        <div className={styles.mobileView}>
          <div className={styles.productsGrid}>
            {products.map((producto) => (
              <Product 
                key={producto.productId}
                producto={producto}
                nathanDumlaoKixfBEdypUnsplash={`/InsumosIMG/${producto.imagen}`}
                className={styles.productCardMobile}
              />
            ))}
          </div>
        </div>

        {/* Botón de cargar más productos */}
        {hasMoreProducts() && (
          <div className={styles.loadMoreContainer}>
            <button
              onClick={loadMoreProducts}
              disabled={loading}
              className={styles.loadMoreButton}
            >
              {loading ? 'Cargando...' : 'Cargar más productos'}
            </button>
          </div>
        )}

        {/* Mensaje cuando no hay productos */}
        {products.length === 0 && !loading && (
          <div className={styles.emptyState}>
            <h3>No se encontraron productos</h3>
            <p>Intenta seleccionar una categoría diferente</p>
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loader}></div>
            <p>Cargando productos...</p>
          </div>
        )}
      </main>

      <TypeStackedSimpleFooter />
    </div>
  );
};

export default Catalogo;