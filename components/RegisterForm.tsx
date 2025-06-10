// components/RegisterForm.tsx
import { saveUser, getUserByEmail } from '../utils/userStorage';
import { v4 as uuidv4 } from 'uuid';

const handleRegister = (formData) => {
  if (getUserByEmail(formData.email)) {
    alert("El correo ya está registrado.");
    return;
  }

  const token = uuidv4();
  const user = {
    ...formData,
    activo: false,
    token,
  };

  saveUser(user);
  console.log("Token de activación:", token);
  alert(`Registro exitoso. Simulación de enlace: /activar-cuenta?token=${token}`);
};
