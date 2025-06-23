import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthDebug: React.FC = () => {
  const [testEmail, setTestEmail] = useState(`test${Date.now()}@example.com`);
  const [testPassword] = useState('test123');
  const [mensaje, setMensaje] = useState('');
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [registroExitoso, setRegistroExitoso] = useState(false);

  // Función para obtener usuarios del localStorage
  const obtenerUsuarios = () => {
    try {
      const users = localStorage.getItem('plena_users');
      const parsedUsers = users ? JSON.parse(users) : [];
      setUsuarios(parsedUsers);
      return parsedUsers;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const testearRegistro = async () => {
    setMensaje('🔄 Iniciando registro...');
    console.log('🧪 === INICIO TEST REGISTRO ===');
    
    try {
      const usuariosAntes = obtenerUsuarios();
      console.log('📝 Usuarios antes del registro:', usuariosAntes.length);
      
      const userData = {
        nombre: 'Test',
        apellido: 'Usuario',
        email: testEmail,
        password: testPassword,
        edad: 25,
        tipoIdentificacion: 'CC',
        numeroIdentificacion: '99999999'
      };
      
      console.log('📤 Enviando datos de registro:', userData.email);
      const result = await authService.register(userData);
      
      console.log('✅ Resultado del registro:', result);
      setMensaje(`✅ Registro exitoso: ${result.user.email}`);
      setRegistroExitoso(true);
      
      // Actualizar lista de usuarios
      const usuariosDespues = obtenerUsuarios();
      console.log('📝 Usuarios después del registro:', usuariosDespues.length);
      
    } catch (error: any) {
      console.error('❌ Error en registro:', error);
      setMensaje(`❌ Error: ${error.message}`);
      setRegistroExitoso(false);
    }
  };

  const testearLogin = async () => {
    if (!registroExitoso) {
      setMensaje('❌ Primero debes registrar un usuario exitosamente');
      return;
    }

    setMensaje('🔄 Iniciando login...');
    console.log('🧪 === INICIO TEST LOGIN ===');
    
    try {
      const usuarios = obtenerUsuarios();
      console.log('📝 Usuarios disponibles para login:', usuarios.map((u: any) => u.email));
      console.log('📝 Intentando login con:', testEmail);
      
      const loginData = {
        email: testEmail,
        password: testPassword
      };
      
      const result = await authService.login(loginData);
      
      console.log('✅ Resultado del login:', result);
      setMensaje(`✅ Login exitoso: ${result.user.email}`);
      
    } catch (error: any) {
      console.error('❌ Error en login:', error);
      setMensaje(`❌ Error en login: ${error.message}`);
      
      // Debug adicional
      const usuarios = obtenerUsuarios();
      console.log('🔍 DEBUG - Usuarios en localStorage:', usuarios);
      console.log('🔍 DEBUG - Buscando email:', testEmail);
      const usuarioEncontrado = usuarios.find((u: any) => u.email === testEmail);
      console.log('🔍 DEBUG - Usuario encontrado:', !!usuarioEncontrado);
      if (usuarioEncontrado) {
        console.log('🔍 DEBUG - Datos del usuario:', usuarioEncontrado);
      }
    }
  };

  const limpiarStorage = () => {
    localStorage.removeItem('plena_users');
    localStorage.removeItem('plena_current_user');
    localStorage.removeItem('plena_session');
    localStorage.removeItem('plena_login_attempts');
    localStorage.removeItem('plena_account_status');
    
    setMensaje('🧹 localStorage limpiado');
    setRegistroExitoso(false);
    setUsuarios([]);
    setTestEmail(`test${Date.now()}@example.com`);
    
    console.log('🧹 localStorage limpiado completamente');
  };

  const generarNuevoEmail = () => {
    const nuevoEmail = `test${Date.now()}@example.com`;
    setTestEmail(nuevoEmail);
    setRegistroExitoso(false);
    setMensaje('📧 Nuevo email generado');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔍 Debug Sistema de Autenticación</h1>
      
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>📧 Email de prueba actual:</h3>
        <p><strong>{testEmail}</strong></p>
        <p><strong>Password:</strong> {testPassword}</p>
        <button onClick={generarNuevoEmail} style={{ marginRight: '10px' }}>
          🔄 Generar Nuevo Email
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>🧪 Pruebas</h3>
        <button 
          onClick={testearRegistro}
          style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          1️⃣ Registrar Usuario
        </button>
        <button 
          onClick={testearLogin}
          disabled={!registroExitoso}
          style={{ 
            marginRight: '10px', 
            padding: '10px 20px', 
            backgroundColor: registroExitoso ? '#28a745' : '#6c757d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px' 
          }}
        >
          2️⃣ Login Usuario
        </button>
        <button 
          onClick={limpiarStorage}
          style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          🧹 Limpiar Todo
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

      <div>
        <h3>👥 Usuarios en localStorage ({usuarios.length})</h3>
        <button onClick={obtenerUsuarios} style={{ marginBottom: '10px' }}>🔄 Actualizar Lista</button>
        {usuarios.length === 0 ? (
          <p>No hay usuarios registrados</p>
        ) : (
          <ul style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
            {usuarios.map((user, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <strong>{user.email}</strong> 
                <br />
                <small>ID: {user.id} | Nombre: {user.nombre} {user.apellido}</small>
                <br />
                <small>Hash: {user.passwordHash ? user.passwordHash.substring(0, 20) + '...' : 'N/A'}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: '30px', fontSize: '12px', color: '#666' }}>
        <p><strong>Instrucciones:</strong></p>
        <ol>
          <li>Haz clic en "Registrar Usuario" para crear un nuevo usuario</li>
          <li>Si el registro es exitoso, haz clic en "Login Usuario" para probar el login</li>
          <li>Revisa la consola del navegador para logs detallados</li>
          <li>Si algo falla, usa "Limpiar Todo" y vuelve a intentar</li>
        </ol>
      </div>
    </div>
  );
};

export default AuthDebug;
