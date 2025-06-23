import React, { useState } from 'react';
import { authService } from '../services/authService';

const RegistroTest: React.FC = () => {
  const [registroData, setRegistroData] = useState({
    nombre: 'Test',
    apellido: 'Usuario',
    email: 'test' + Date.now() + '@example.com',
    password: 'test123'
  });
  const [mensaje, setMensaje] = useState<string>('');
  const [cargando, setCargando] = useState(false);

  const handleRegistro = async () => {
    setCargando(true);
    setMensaje('');
    
    try {
      console.log('🧪 PRUEBA DE REGISTRO - Datos:', registroData);
      const result = await authService.register(registroData);
      
      console.log('✅ REGISTRO EXITOSO:', result);
      setMensaje(`✅ Usuario registrado exitosamente: ${result.user.email}`);
      
      // Generar nuevo email para siguiente prueba
      setRegistroData({
        ...registroData,
        email: 'test' + Date.now() + '@example.com'
      });
      
    } catch (error: any) {
      console.error('❌ ERROR EN REGISTRO:', error);
      setMensaje(`❌ Error: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  const handleLoginConNuevoUsuario = async () => {
    setCargando(true);
    setMensaje('');
    
    try {
      // Usar el email del último registro exitoso
      const ultimoEmail = registroData.email;
      const loginData = {
        email: ultimoEmail,
        password: registroData.password
      };
      
      console.log('🧪 PRUEBA DE LOGIN CON USUARIO REGISTRADO:', loginData);
      const result = await authService.login(loginData);
      
      console.log('✅ LOGIN EXITOSO:', result);
      setMensaje(`✅ Login exitoso con usuario registrado: ${result.user.email}`);
      
    } catch (error: any) {
      console.error('❌ ERROR EN LOGIN:', error);
      setMensaje(`❌ Error en login: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  const verificarUsuariosGuardados = () => {
    const users = localStorage.getItem('plena_users');
    if (users) {
      const userList = JSON.parse(users);
      console.log('👥 USUARIOS GUARDADOS:', userList);
      setMensaje(`👥 Usuarios en localStorage: ${userList.length} usuarios encontrados`);
    } else {
      setMensaje('❌ No hay usuarios guardados en localStorage');
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #007bff', margin: '20px', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
      <h2>🧪 PRUEBAS DE REGISTRO</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Datos de prueba:</h3>
        <div style={{ background: '#fff', padding: '15px', borderRadius: '4px' }}>
          <p><strong>Nombre:</strong> {registroData.nombre}</p>
          <p><strong>Apellido:</strong> {registroData.apellido}</p>
          <p><strong>Email:</strong> {registroData.email}</p>
          <p><strong>Password:</strong> {registroData.password}</p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleRegistro} 
          disabled={cargando}
          style={{ 
            padding: '10px 20px', 
            background: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            marginRight: '10px',
            cursor: cargando ? 'not-allowed' : 'pointer'
          }}
        >
          {cargando ? '⏳ Registrando...' : '📝 Registrar Usuario'}
        </button>

        <button 
          onClick={handleLoginConNuevoUsuario} 
          disabled={cargando}
          style={{ 
            padding: '10px 20px', 
            background: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            marginRight: '10px',
            cursor: cargando ? 'not-allowed' : 'pointer'
          }}
        >
          {cargando ? '⏳ Haciendo login...' : '🔑 Login con Usuario Registrado'}
        </button>

        <button 
          onClick={verificarUsuariosGuardados}
          style={{ 
            padding: '10px 20px', 
            background: '#6c757d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          👥 Ver Usuarios Guardados
        </button>
      </div>

      {mensaje && (
        <div style={{ 
          padding: '15px', 
          borderRadius: '4px', 
          backgroundColor: mensaje.includes('✅') ? '#d4edda' : '#f8d7da',
          border: mensaje.includes('✅') ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
          color: mensaje.includes('✅') ? '#155724' : '#721c24'
        }}>
          {mensaje}
        </div>
      )}

      <div style={{ background: '#e7f3ff', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
        <h3>🔧 INSTRUCCIONES DE PRUEBA</h3>
        <ol>
          <li><strong>Registrar:</strong> Clic en "Registrar Usuario" → Crea nuevo usuario con email único</li>
          <li><strong>Login:</strong> Clic en "Login con Usuario Registrado" → Usa las credenciales del usuario recién creado</li>
          <li><strong>Verificar:</strong> Clic en "Ver Usuarios Guardados" → Revisa la consola y mensaje</li>
        </ol>
        <p style={{ fontSize: '14px', color: '#666' }}>
          ✅ Funciona en localhost, Surge, Vercel y cualquier entorno<br/>
          ✅ Sistema de fallback automático sin backend
        </p>
      </div>
    </div>
  );
};

export default RegistroTest;
