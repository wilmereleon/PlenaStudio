import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import { productosDisponibles } from '../types/productos';

const CarritoTest: React.FC = () => {
  const { cartItems, addItem } = useCart();
  const { user, login, logout, isAuthenticated } = useAuth();
  const [loginData, setLoginData] = useState({ email: 'demo@plenastudio.com', password: 'password' });

  // Usar el primer producto de la lista para pruebas
  const productoTest = productosDisponibles[0];
  const handleLogin = async () => {
    try {
      console.log("🔄 INICIANDO LOGIN - Estado del carrito antes:", cartItems.length, "items");
      await login(loginData);
      console.log("✅ LOGIN EXITOSO - Verificando carrito después del login...");
      
      // Esperar un momento para que se complete la sincronización
      setTimeout(() => {
        console.log("🛒 CARRITO DESPUÉS DEL LOGIN:", cartItems.length, "items");
      }, 1000);
    } catch (error) {
      console.error("❌ Error en login:", error);
    }
  };

  const handleLogout = () => {
    logout();
    console.log("🔴 Logout ejecutado");
  };
  const handleAddToCart = () => {
    console.log("🛒 AGREGANDO PRODUCTO - Estado antes:", cartItems.length, "items");
    addItem(productoTest, 1);
    console.log("🛒 PRODUCTO AGREGADO - Estado después:", cartItems.length + 1, "items (esperado)");
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #ccc', margin: '20px', borderRadius: '8px' }}>
      <h2>🧪 PRUEBAS DE CARRITO</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Estado de Autenticación:</h3>
        <p><strong>Usuario:</strong> {isAuthenticated ? user?.email : 'No autenticado'}</p>
        <p><strong>Autenticado:</strong> {isAuthenticated ? '✅' : '❌'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Carrito Actual:</h3>
        <p><strong>Items:</strong> {cartItems.length}</p>
        {cartItems.map(item => (
          <div key={item.productId} style={{ background: '#f5f5f5', padding: '10px', margin: '5px', borderRadius: '4px' }}>
            {item.nombre} - Cantidad: {item.cantidad} - Precio: ${item.precio.toLocaleString()}
          </div>
        ))}
        {cartItems.length === 0 && <p style={{ color: '#666' }}>Carrito vacío</p>}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Acciones:</h3>
        
        {!isAuthenticated ? (
          <div style={{ marginBottom: '10px' }}>
            <input 
              type="email" 
              placeholder="Email" 
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <button onClick={handleLogin} style={{ padding: '5px 10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
              🔑 Login
            </button>
          </div>
        ) : (
          <button onClick={handleLogout} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '10px' }}>
            🚪 Logout
          </button>
        )}

        <div>
          <button onClick={handleAddToCart} style={{ padding: '5px 10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            🛒 Agregar Aretes al Carrito
          </button>
        </div>
      </div>      <div style={{ background: '#e9f7ef', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>🔧 PRUEBA ESPECÍFICA: Persistencia del Carrito en Login</h3>
        <p><strong>Problema corregido:</strong> El carrito se desaparecía al hacer login</p>
        <p><strong>Solución:</strong> Sincronización automática del carrito local con el servidor</p>
        
        <div style={{ background: '#fff', padding: '10px', borderRadius: '4px', margin: '10px 0' }}>
          <h4>Pasos de prueba recomendados:</h4>
          <ol>
            <li>🛒 <strong>Agregar productos SIN login</strong> → Los productos se guardan en localStorage</li>
            <li>🔑 <strong>Hacer login</strong> → Los productos se sincronizan automáticamente con el servidor</li>
            <li>✅ <strong>Verificar</strong> → El carrito mantiene los productos después del login</li>
            <li>🔄 <strong>Recargar página</strong> → Los productos persisten desde la base de datos</li>
          </ol>
        </div>
        
        <div style={{ background: '#f8f9fa', padding: '8px', borderRadius: '4px', fontSize: '14px' }}>
          <strong>Estado actual:</strong> Carrito con {cartItems.length} items | Usuario: {isAuthenticated ? '✅ Autenticado' : '❌ No autenticado'}
        </div>
      </div>

      <div>
        <h3>Instrucciones de Prueba:</h3>
        <ol>
          <li>🛒 Agregar productos SIN estar logueado (se guardan en localStorage)</li>
          <li>🔑 Hacer login (los productos se sincronizan con el servidor)</li>
          <li>🛒 Agregar más productos (se guardan en la base de datos)</li>
          <li>🚪 Hacer logout (el carrito se limpia)</li>
          <li>🔑 Hacer login de nuevo (carrito debe aparecer desde la BD)</li>
        </ol>
      </div>

      <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ffeaa7' }}>
        <h3>🔑 CREDENCIALES DE PRUEBA</h3>
        <p><strong>Para entornos SIN backend (Surge/Vercel):</strong></p>
        <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px', margin: '10px 0', fontSize: '14px' }}>
          <strong>Usuarios disponibles:</strong><br/>
          • <code>demo@plenastudio.com</code> / <code>password</code><br/>
          • <code>admin@plenastudio.co</code> / <code>admin123</code><br/>
          • <code>usuario@demo.com</code> / <code>demo123</code><br/>
          • <code>test@test.com</code> / <code>test123</code><br/>
          • <code>ana@example.com</code> / <code>ana123</code>
        </div>
        <p style={{ fontSize: '12px', color: '#666' }}>
          ✅ Funciona en localhost, Surge, Vercel y cualquier entorno<br/>
          ✅ Sistema de fallback automático sin backend
        </p>
      </div>
    </div>
  );
};

export default CarritoTest;
