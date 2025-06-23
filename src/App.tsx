import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import PginaWeb from "./pages/PginaWeb";
import RegisterForm from "./components/RegisterForm";
import Login from "./pages/Login";
import { CartProvider } from "./context/CartContext";
import Aretes from "./pages/Aretes";
import Bufandas from "./pages/Bufandas";
import Combinaciones from "./pages/Combinaciones";
import Anillos from "./pages/Anillos";
import Pulseras from "./pages/Pulseras";
import ShoppingCart from "./pages/ShoppingCart";
import Catalogo from "./pages/Catalogo";
import Buscar from "./pages/Buscar";
import CarritoTest from "./components/CarritoTest";
import AuthDebug from "./components/AuthDebug";
import AuthTest from "./components/AuthTest";
import CartSyncTest from "./components/CartSyncTest";

/**
 * App
 * 
 * Componente principal de la aplicación Plena Studio.
 * Configura las rutas principales, gestiona el scroll al navegar y actualiza el título y la meta descripción.
 * 
 * @component
 * 
 * @returns {JSX.Element} El árbol de rutas de la aplicación.
 */
function App() {
  // Obtiene el tipo de navegación (PUSH, POP, REPLACE)
  const action = useNavigationType();
  // Obtiene la ubicación actual
  const location = useLocation();
  // Extrae el pathname de la ubicación
  const pathname = location.pathname;

  // Efecto para hacer scroll al inicio en cada navegación (excepto POP)
  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  // Efecto para actualizar el título y la meta descripción según la ruta
  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      default:
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  // Definición de rutas principales de la aplicación
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<PginaWeb />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/aretes" element={<Aretes />} />
        <Route path="/bufandas" element={<Bufandas />} />
        <Route path="/combinaciones" element={<Combinaciones />} />        <Route path="/anillos" element={<Anillos />} />        <Route path="/pulseras" element={<Pulseras />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/buscar" element={<Buscar />} />        <Route path="/test-carrito" element={<CarritoTest />} />
        <Route path="/auth-debug" element={<AuthDebug />} />
        <Route path="/auth-test" element={<AuthTest />} />
        <Route path="/cart-sync-test" element={<CartSyncTest />} />
      </Routes>
    </CartProvider>
  );
}

export default App;