import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { authService } from '../services/authService';
import { productosDisponibles } from '../types/productos';

const CartSyncTest: React.FC = () => {
  const { cartItems, addItem } = useContext(CartContext);
  const [usuario, setUsuario] = useState<any>(null);
  const [mensaje, setMensaje] = useState('');

  // Verificar usuario actual
  const verificarUsuario = () => {
    const currentUser = authService.getCurrentUser();
    setUsuario(currentUser);
    setMensaje(currentUser ? `Usuario autenticado: ${currentUser.email}` : 'No hay usuario autenticado');
  };

  // Agregar producto de prueba al carrito
  const agregarProductoPrueba = async () => {
    const productoPrueba = productosDisponibles[0]; // Tomar el primer producto disponible
    if (productoPrueba) {
      await addItem(productoPrueba, 1);
      setMensaje(`✅ Producto "${productoPrueba.nombre}" agregado al carrito`);
    }
  };

  // Login de prueba
  const loginPrueba = async () => {
    try {
      const result = await authService.login({
        email: 'demo@plenastudio.com',
        password: 'password'
      });
      setUsuario(result.user);
      setMensaje(`✅ Login exitoso: ${result.user.email}`);
    } catch (error: any) {
      setMensaje(`❌ Error en login: ${error.message}`);
    }
  };

  // Logout de prueba
  const logoutPrueba = () => {
    authService.logout();
    setUsuario(null);
    setMensaje('🚪 Logout realizado');
  };

  // Verificar localStorage
  const verificarLocalStorage = () => {
    const localCart = localStorage.getItem('plena_cart');
    const currentUser = localStorage.getItem('plena_current_user');
    const session = localStorage.getItem('plena_session');
    
    console.log('📝 Estado del localStorage:');
    console.log('- plena_cart:', localCart ? JSON.parse(localCart) : 'vacío');
    console.log('- plena_current_user:', currentUser ? JSON.parse(currentUser) : 'no hay usuario');
    console.log('- plena_session:', session ? JSON.parse(session) : 'no hay sesión');
    
    setMensaje('📝 Estado del localStorage enviado a la consola');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔄 Test de Sincronización del Carrito</h1>
      
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>👤 Estado del Usuario</h3>
        <p><strong>Usuario actual:</strong> {usuario ? `${usuario.nombre} (${usuario.email})` : 'No autenticado'}</p>
        <button onClick={verificarUsuario} style={{ marginRight: '10px' }}>
          🔍 Verificar Usuario
        </button>
        <button onClick={loginPrueba} style={{ marginRight: '10px' }}>
          🔑 Login Demo
        </button>
        <button onClick={logoutPrueba}>
          🚪 Logout
        </button>
      </div>

      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>🛒 Estado del Carrito</h3>
        <p><strong>Productos en carrito:</strong> {cartItems.length}</p>
        {cartItems.length > 0 && (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.nombre} - Cantidad: {item.cantidad} - Precio: ${item.precio.toLocaleString()}
              </li>
            ))}
          </ul>
        )}
        <button onClick={agregarProductoPrueba} style={{ marginRight: '10px' }}>
          ➕ Agregar Producto de Prueba
        </button>
        <button onClick={verificarLocalStorage}>
          📝 Ver localStorage
        </button>
      </div>

      {mensaje && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: mensaje.includes('❌') ? '#f8d7da' : '#d4edda', 
          color: mensaje.includes('❌') ? '#721c24' : '#155724',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          {mensaje}
        </div>
      )}

      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <h3>📋 Flujo de Prueba Recomendado:</h3>
        <ol>
          <li><strong>Agregar productos sin login:</strong> Haz clic en "Agregar Producto de Prueba" varias veces</li>
          <li><strong>Verificar carrito local:</strong> Los productos deben aparecer en la lista</li>
          <li><strong>Hacer login:</strong> Haz clic en "Login Demo"</li>
          <li><strong>Verificar sincronización:</strong> Los productos deben mantenerse en el carrito</li>
          <li><strong>Revisar logs:</strong> Abre la consola del navegador para ver logs detallados</li>
          <li><strong>Hacer logout:</strong> El carrito debe limpiarse</li>
        </ol>
        
        <h3>🔍 Logs Esperados en la Consola:</h3>
        <ul>
          <li><strong>Al agregar productos:</strong> "CartContext.syncWithServer - Usuario no autenticado, saltando sincronización"</li>
          <li><strong>Al hacer login:</strong> "Disparando evento authStateChanged" → "Iniciando sincronización de carrito en login"</li>
          <li><strong>Al sincronizar:</strong> "CartService.saveCart - Guardando carrito: X productos"</li>
        </ul>
      </div>
    </div>
  );
};

export default CartSyncTest;
