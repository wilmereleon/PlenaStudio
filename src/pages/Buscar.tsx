import { FunctionComponent, useState, useEffect, useMemo } from "react";
import { useCart, productosDisponibles, type Producto } from "../context/CartContext";
import TypeFloatingHeaderWithNavi from "../components/TypeFloatingHeaderWithNavi";
import TypeStackedSimpleFooter from "../components/TypeStackedSimpleFooter";
import OptimizedImage from "../components/OptimizedImage";
import styles from "./Buscar.module.css";

const Buscar: FunctionComponent = () => {
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const searchProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    const words = query.split(/\s+/);
    
    return productosDisponibles.filter(producto => {
      const searchableText = `${producto.nombre} ${producto.descripcion}`.toLowerCase();
      
      // Buscar que al menos una palabra coincida
      return words.some(word => {
        if (word.length < 2) return false;
        return searchableText.includes(word);
      });
    }).slice(0, 20);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLoading(true);
      setTimeout(() => {
        setSearchHistory(prev => {
          const newHistory = [searchQuery, ...prev.filter(q => q !== searchQuery)].slice(0, 5);
          localStorage.setItem('searchHistory', JSON.stringify(newHistory));
          return newHistory;
        });
        setLoading(false);
      }, 300);
    }
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (producto: Producto) => {
    addItem(producto, 1);
  };

  const handleBuyNow = (producto: Producto) => {
    addItem(producto, 1);
    window.location.href = '/shopping-cart';
  };

  useEffect(() => {
    const saved = localStorage.getItem('searchHistory');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  const popularSearches = [
    "aretes dorados", "anillos plata", "perlas", "cristal", 
    "minimal", "vintage", "elegante", "moderno"
  ];

  return (
    <div>
      <TypeFloatingHeaderWithNavi />
      
      <main className={styles.main}>
        {/* Header de búsqueda */}
        <div className={styles.catalogHeader}>
          <h1 className={styles.title}>Buscar Productos</h1>
          <p className={styles.subtitle}>Encuentra exactamente lo que buscas</p>
        </div>

        {/* Barra de búsqueda */}
        <div className={styles.searchContainer}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchInputContainer}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, descripción o características..."
                className={styles.searchInput}
                autoFocus
              />
              <button type="submit" className={styles.searchButton}>
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          {/* Búsquedas recientes */}
          {searchHistory.length > 0 && (
            <div className={styles.categoriesContainer}>
              <h2 className={styles.categoriesTitle}>Búsquedas recientes</h2>
              <div className={styles.categoriesGrid}>
                {searchHistory.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSearch(query)}
                    className={styles.categoryCard}
                  >
                    <span className={styles.categoryName}>{query}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Búsquedas populares */}
          {!searchQuery && (
            <div className={styles.categoriesContainer}>
              <h2 className={styles.categoriesTitle}>Búsquedas populares</h2>
              <div className={styles.categoriesGrid}>
                {popularSearches.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSearch(query)}
                    className={styles.categoryCard}
                  >
                    <span className={styles.categoryName}>{query}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Resultados de búsqueda */}
        {searchQuery && (
          <div className={styles.searchResults}>
            <div className={styles.resultsHeader}>
              <h2 className={styles.categoriesTitle}>Resultados para "{searchQuery}"</h2>
              <span className={styles.resultsCount}>
                {searchProducts.length} producto{searchProducts.length !== 1 ? 's' : ''} encontrado{searchProducts.length !== 1 ? 's' : ''}
              </span>
            </div>

            {loading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.loader}></div>
                <p>Buscando productos...</p>
              </div>
            ) : (
              <>
                {searchProducts.length > 0 ? (
                  <div className={styles.productsGrid}>
                    {searchProducts.map((producto) => (
                      <div key={producto.productId} className={styles.productCardMobile}>
                        <OptimizedImage
                          src={`/InsumosIMG/${producto.imagen}`}
                          alt={producto.nombre}
                          className={styles.productImage}
                          loading="lazy"
                          sizes="(max-width: 576px) 150px, (max-width: 768px) 200px, 250px"
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
                              <i className="bi bi-cart-plus"></i>
                              Agregar
                            </button>
                            <button 
                              className={styles.buyNowBtn}
                              onClick={() => handleBuyNow(producto)}
                            >
                              <i className="bi bi-lightning"></i>
                              Comprar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                      <i className="bi bi-search"></i>
                    </div>
                    <h3>No se encontraron productos</h3>
                    <p>Intenta con términos más generales o revisa nuestras búsquedas populares</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Estado inicial vacío */}
        {!searchQuery && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <i className="bi bi-search-heart"></i>
            </div>
            <h3>¿Qué estás buscando?</h3>
            <p>Escribe en el campo de búsqueda para encontrar productos específicos</p>
          </div>
        )}
      </main>

      <TypeStackedSimpleFooter />
    </div>
  );
};

export default Buscar;