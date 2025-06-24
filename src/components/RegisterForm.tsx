import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

interface FormData {
  nombres: string;
  apellidos: string;
  correo: string;
  direccion: string;
  celular: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  contraseña: string;
  confirmar: string;
}

interface Errores {
  [key: string]: boolean;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
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

  const [errores, setErrores] = useState<Errores>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Errores = {};

    if (!formData.nombres) newErrors.nombres = true;
    if (!formData.apellidos) newErrors.apellidos = true;
    if (!formData.correo.includes('@')) newErrors.correo = true;
    // Validación de email duplicado se delega al backend
    if (!formData.direccion) newErrors.direccion = true;
    if (!formData.celular) newErrors.celular = true;
    if (!formData.tipoIdentificacion) newErrors.tipoIdentificacion = true;
    if (!formData.numeroIdentificacion) newErrors.numeroIdentificacion = true;
    if (formData.contraseña.length < 6) newErrors.contraseña = true;
    if (formData.contraseña !== formData.confirmar) newErrors.confirmar = true;

    setErrores(newErrors);
    setMensaje(null);

    if (Object.keys(newErrors).length === 0) {
      setCargando(true);
      try {
        // Mapeo de campos para la tabla usuario
        const payload = {
          nombre: formData.nombres,
          apellido: formData.apellidos,
          email: formData.correo,
          password: formData.contraseña,
          tipoIdentificacion: formData.tipoIdentificacion,
          numeroIdentificacion: formData.numeroIdentificacion
        };
        const response = await fetch('http://localhost/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          setMensaje('Registro exitoso. Revisa tu correo para activar la cuenta.');
          limpiarFormulario();
        } else {
          const data = await response.json().catch(() => ({}));
          setMensaje(data?.message || 'Error al registrar usuario.');
        }
      } catch (error) {
        setMensaje('Error de conexión con el servidor.');
      } finally {
        setCargando(false);
      }
    }
  };

  const limpiarFormulario = () => {
    setFormData({
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
    setErrores({});
  };

  const handleCancel = () => {
    console.log("🔙 Cancel button clicked - navigating to home page");
    navigate('/');
  };

  return (
    <div className="registro-bg">
      <div className="registro-logo">
        <img src="/logoPlenaStudio.png" alt="Plena Studio" />
      </div>
      <h2 className="registro-titulo">Crea tu cuenta</h2>
      {mensaje && (
        <div style={{ color: mensaje.startsWith('Registro exitoso') ? 'green' : 'red', marginBottom: 12 }}>{mensaje}</div>
      )}
      <form className="registro-form" onSubmit={handleSubmit} autoComplete="off">
        <fieldset className="registro-fieldset">
          <legend className="registro-legend">Tus datos</legend>
          <div className="registro-grid">
            {/* Campos de datos personales */}
            <div className="registro-col">
              <label htmlFor="nombres">Nombres</label>
              <input
                id="nombres"
                className={errores.nombres ? 'error' : ''}
                placeholder="Ingresa tu nombre aquí"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
              />
            </div>
            <div className="registro-col">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                id="apellidos"
                className={errores.apellidos ? 'error' : ''}
                placeholder="Ingresa tus apellidos aquí"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
              />
            </div>
            <div className="registro-col">
              <label htmlFor="correo">Correo</label>
              <input
                id="correo"
                className={errores.correo ? 'error' : ''}
                placeholder="ejemplo@email.com"
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <div className="registro-col">
              <label htmlFor="direccion">Dirección de residencia</label>
              <input
                id="direccion"
                className={errores.direccion ? 'error' : ''}
                placeholder="Carrera, número, bloque, casa..."
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>
            <div className="registro-col">
              <label htmlFor="celular">Teléfono celular</label>
              <input
                id="celular"
                className={errores.celular ? 'error' : ''}
                placeholder="Número de teléfono celular"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
              />
            </div>
            <div className="registro-col">
              <label htmlFor="tipoIdentificacion">Tipo de identificación</label>
              <select
                id="tipoIdentificacion"
                className={errores.tipoIdentificacion ? 'error' : ''}
                name="tipoIdentificacion"
                value={formData.tipoIdentificacion}
                onChange={handleChange}
              >
                <option value="">Selecciona el tipo de identificación</option>
                <option value="CC">Cédula de ciudadanía</option>
                <option value="CE">Cédula de extranjería</option>
                <option value="TI">Tarjeta de identidad</option>
              </select>
            </div>
            <div className="registro-col">
              <label htmlFor="numeroIdentificacion">Número de identificación</label>
              <input
                id="numeroIdentificacion"
                className={errores.numeroIdentificacion ? 'error' : ''}
                placeholder="Ingrese número de ID"
                name="numeroIdentificacion"
                value={formData.numeroIdentificacion}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>
            {/* Contraseña */}
            <div className="registro-col">
              <label htmlFor="contraseña">Contraseña</label>
              <div className="registro-password">
                <input
                  id="contraseña"
                  className={`form-control ${errores.contraseña ? 'error' : ''}`}
                  placeholder="Por favor digita tu contraseña"
                  type={showPassword ? "text" : "password"}
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  autoComplete="new-password"
                  style={{ background: "#F4D7D7", borderRadius: 20, paddingRight: 36 }}
                />
                <span
                  className="registro-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  style={{
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    position: 'absolute',
                    cursor: 'pointer'
                  }}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} style={{ fontSize: 20, color: "#232c2b" }}></i>
                </span>
              </div>
            </div>
            {/* Confirmar contraseña */}
            <div className="registro-col">
              <label htmlFor="confirmar">Confirma tu contraseña</label>
              <div className="registro-password">
                <input
                  id="confirmar"
                  className={`form-control ${errores.confirmar ? 'error' : ''}`}
                  placeholder="Confirma tu contraseña"
                  type={showConfirm ? "text" : "password"}
                  name="confirmar"
                  value={formData.confirmar}
                  onChange={handleChange}
                  autoComplete="new-password"
                  style={{ background: "#F4D7D7", borderRadius: 20, paddingRight: 36 }}
                />
                <span
                  className="registro-eye"
                  onClick={() => setShowConfirm(!showConfirm)}
                  tabIndex={-1}
                  style={{
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    position: 'absolute',
                    cursor: 'pointer'
                  }}
                >
                  <i className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`} style={{ fontSize: 20, color: "#232c2b" }}></i>
                </span>
              </div>
            </div>
          </div>
        </fieldset>
        <div className="registro-botones">
          <button
            type="button"
            className="cancelar"
            onClick={handleCancel}
            style={{ background: "#8ABF69", borderRadius: 20, width: 136, height: 31 }}
            disabled={cargando}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="registrar"
            style={{ background: "#8ABF69", borderRadius: 20, width: 136, height: 31 }}
            disabled={cargando}
          >
            {cargando ? 'Registrando...' : 'Regístrate'}
          </button>
        </div>
        <div className="registro-login" style={{ textAlign: "center", marginTop: 8 }}>
          <div>¿Ya estás registrado?</div>
          <a href="/login" style={{ display: "block", marginTop: 4 }}>Iniciar sesión</a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;