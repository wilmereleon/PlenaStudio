import React, { useState } from 'react';

const AuthTest: React.FC = () => {
  const [mensaje, setMensaje] = useState('');
  const [email, setEmail] = useState(`test${Date.now()}@example.com`);

  const USERS_KEY = 'plena_users';

  const hashPassword = (password: string): string => {
    return btoa(password + 'salt_plena_studio');
  };

  const getStoredUsers = (): any[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  };

  const testRegistroDirecto = () => {
    setMensaje('🔄 Probando registro directo...');
    
    try {
      // Obtener usuarios existentes
      const users = getStoredUsers();
      console.log('📝 Usuarios antes del registro:', users.length);
      
      // Crear nuevo usuario
      const newUser = {
        id: (users.length + 1).toString(),
        nombre: 'Test',
        apellido: 'Usuario',
        email: email,
        edad: 25,
        tipoIdentificacion: 'CC',
        numeroIdentificacion: '99999999',
        fechaRegistro: new Date().toISOString(),
        passwordHash: hashPassword('test123')
      };
      
      // Guardar en localStorage
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Verificar inmediatamente
      const usuariosVerificacion = getStoredUsers();
      const usuarioEncontrado = usuariosVerificacion.find((u: any) => u.email === email);
      
      console.log('✅ Usuario guardado:', newUser);
      console.log('✅ Verificación inmediata:', !!usuarioEncontrado);
      console.log('✅ Total usuarios:', usuariosVerificacion.length);
      
      setMensaje(`✅ Registro directo exitoso. Usuario ${email} guardado.`);
      
    } catch (error: any) {
      console.error('❌ Error en registro directo:', error);
      setMensaje(`❌ Error: ${error.message}`);
    }
  };

  const testLoginDirecto = () => {
    setMensaje('🔄 Probando login directo...');
    
    try {
      // Buscar usuario
      const users = getStoredUsers();
      console.log('📝 Usuarios disponibles:', users.map((u: any) => u.email));
      console.log('📝 Buscando:', email);
      
      const user = users.find((u: any) => u.email === email);
      
      if (!user) {
        console.error('❌ Usuario no encontrado');
        setMensaje(`❌ Usuario ${email} no encontrado en localStorage`);
        return;
      }
      
      // Verificar contraseña
      const passwordHash = hashPassword('test123');
      const passwordCorrect = passwordHash === user.passwordHash;
      
      console.log('✅ Usuario encontrado:', user.email);
      console.log('✅ Password correcto:', passwordCorrect);
      
      if (passwordCorrect) {
        setMensaje(`✅ Login directo exitoso para ${email}`);
      } else {
        setMensaje(`❌ Password incorrecta para ${email}`);
      }
      
    } catch (error: any) {
      console.error('❌ Error en login directo:', error);
      setMensaje(`❌ Error: ${error.message}`);
    }
  };

  const mostrarUsuarios = () => {
    const users = getStoredUsers();
    console.log('📝 Lista de usuarios en localStorage:');
    users.forEach((user: any, index: number) => {
      console.log(`${index + 1}. ${user.email} (ID: ${user.id})`);
    });
    setMensaje(`📝 ${users.length} usuarios en localStorage. Ver consola para detalles.`);
  };

  const limpiarTodo = () => {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem('plena_current_user');
    localStorage.removeItem('plena_session');
    setMensaje('🧹 localStorage limpiado');
    setEmail(`test${Date.now()}@example.com`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🧪 Test Directo de Autenticación</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Email de prueba:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '5px', marginTop: '5px' }}
        />
        <small>Password fijo: test123</small>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={testRegistroDirecto} style={{ marginRight: '10px' }}>
          1️⃣ Registro Directo
        </button>
        <button onClick={testLoginDirecto} style={{ marginRight: '10px' }}>
          2️⃣ Login Directo
        </button>
        <button onClick={mostrarUsuarios} style={{ marginRight: '10px' }}>
          📝 Ver Usuarios
        </button>
        <button onClick={limpiarTodo}>
          🧹 Limpiar
        </button>
      </div>

      {mensaje && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: mensaje.includes('❌') ? '#f8d7da' : '#d4edda', 
          borderRadius: '5px' 
        }}>
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default AuthTest;
