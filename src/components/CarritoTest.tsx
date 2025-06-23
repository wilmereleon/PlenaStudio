import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';

const CarritoTest: React.FC = () => {
  const { cartItems, addItem } = useCart();
  const { user, login, logout, isAuthenticated } = useAuth();
  const [loginData, setLoginData] = useState({ email: 'wilmereleon@hotmail.com', password: 'test123' });

  // Producto de prueba
  const productoTest = {
    productId: "1",
    nombre: "Aretes Luna Dorada",
    descripcion: "Aretes elegantes de oro",
    precio: 28000,
    imagen: "earring01.jpeg"
  };

  const handleLogin = async () => {
    try {
      await login(loginData);
      console.log("✅ Login exitoso");
    } catch (error) {
      console.error("❌ Error en login:", error);
    }
  };

  const handleLogout = () => {
    logout();
    console.log("🔴 Logout ejecutado");
  };

  const handleAddToCart = () => {
    addItem(productoTest, 1);
    console.log("🛒 Producto agregado al carrito");
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
    </div>
  );
};

export default CarritoTest;
