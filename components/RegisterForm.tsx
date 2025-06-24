// components/RegisterForm.tsx
import { authService } from '../src/services/authService';

const handleRegister = async (formData) => {
  try {
    // Mapear los datos del formulario al formato esperado por el authService
    const userData = {
      nombre: formData.nombres,
      apellido: formData.apellidos,
      email: formData.correo,
      password: formData.contraseña,
      tipoIdentificacion: formData.tipoIdentificacion,
      numeroIdentificacion: formData.numeroIdentificacion,
    };

    // Registrar usuario usando el authService (conecta con backend)
    const result = await authService.register(userData);
    
    console.log("✅ Usuario registrado exitosamente:", result);
    console.log("Token de activación:", result.token);
    alert(`Registro exitoso. Usuario creado en la base de datos. Token: ${result.token}`);
    
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    alert(`Error en el registro: ${error.message}`);
  }
};
