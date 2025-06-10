// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveUser, getUserByEmail } from '../utils/userStorage';
import './RegisterForm.css'; // archivo CSS separado

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    direccion: '',
    celular: '',
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    contraseña: '',
    confirmar: ''
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validaciones
    if (!formData.nombres) newErrors.nombres = true;
    if (!formData.apellidos) newErrors.apellidos = true;
    if (!formData.correo.includes('@')) newErrors.correo = true;
    if (getUserByEmail(formData.correo)) newErrors.correo = true;
    if (!formData.direccion) newErrors.direccion = true;
    if (!formData.celular) newErrors.celular = true;
    if (!formData.tipoIdentificacion) newErrors.tipoIdentificacion = true;
    if (!formData.numeroIdentificacion) newErrors.numeroIdentificacion = true;
    if (formData.contraseña.length < 6) newErrors.contraseña = true;
    if (formData.contraseña !== formData.confirmar) newErrors.confirmar = true;

    setErrores(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const token = uuidv4();
      const user = {
        ...formData,
        activo: false,
        token
      };
      saveUser(user);
      alert(`Registro exitoso. Simulación de enlace de activación: /activar-cuenta?token=${token}`);
    }
  };

  return (
    <div className="registro-container">
      <h2>Crea tu cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="campos">
          <input className={errores.nombres ? 'error' : ''} placeholder="Ingresa tu nombre aquí" name="nombres" value={formData.nombres} onChange={handleChange} />
          <input className={errores.apellidos ? 'error' : ''} placeholder="Ingresa tus apellidos aquí" name="apellidos" value={formData.apellidos} onChange={handleChange} />
          <input className={errores.correo ? 'error' : ''} placeholder="ejemplo@email.com" name="correo" value={formData.correo} onChange={handleChange} />
          <input className={errores.direccion ? 'error' : ''} placeholder="Carrera, número, bloque, casa..." name="direccion" value={formData.direccion} onChange={handleChange} />
          <input className={errores.celular ? 'error' : ''} placeholder="Número de teléfono celular" name="celular" value={formData.celular} onChange={handleChange} />
          <select className={errores.tipoIdentificacion ? 'error' : ''} name="tipoIdentificacion" value={formData.tipoIdentificacion} onChange={handleChange}>
            <option value="">Selecciona el tipo de identificación</option>
            <option value="CC">Cédula de ciudadanía</option>
            <option value="CE">Cédula de extranjería</option>
            <option value="TI">Tarjeta de identidad</option>
          </select>
          <input className={errores.numeroIdentificacion ? 'error' : ''} placeholder="Ingrese número de ID" name="numeroIdentificacion" value={formData.numeroIdentificacion} onChange={handleChange} />
          <input className={errores.confirmar ? 'error' : ''} placeholder="Por favor digita tu contraseña" type="password" name="confirmar" value={formData.confirmar} onChange={handleChange} />
          <input className={errores.contraseña ? 'error' : ''} placeholder="Por favor digita tu contraseña" type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} />
        </div>
        <div className="botones">
          <button type="button" className="cancelar">Cancelar</button>
          <button type="submit" className="registrar">Regístrate</button>
        </div>
        <p>¿Ya estás registrado? <a href="/login">Inicia sesión</a></p>
      </form>
    </div>
  );
};

export default RegisterForm;
