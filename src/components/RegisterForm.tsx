import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveUser, getUserByEmail } from '../utils/userStorage';
import './RegisterForm.css';

/**
 * Interfaz para los datos del formulario de registro.
 * @property {string} nombres - Nombres del usuario.
 * @property {string} apellidos - Apellidos del usuario.
 * @property {string} correo - Correo electrónico del usuario.
 * @property {string} direccion - Dirección de residencia.
 * @property {string} celular - Teléfono celular.
 * @property {string} tipoIdentificacion - Tipo de identificación.
 * @property {string} numeroIdentificacion - Número de identificación.
 * @property {string} contraseña - Contraseña.
 * @property {string} confirmar - Confirmación de la contraseña.
 */
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

/**
 * Interfaz para los errores del formulario.
 * Cada campo puede tener un error booleano.
 */
interface Errores {
  [key: string]: boolean;
}

/**
 * RegisterForm
 * 
 * Componente de formulario de registro de usuario para Plena Studio.
 * Permite a los usuarios crear una cuenta ingresando sus datos personales y credenciales.
 * 
 * @component
 * 
 * @returns {JSX.Element} El formulario de registro.
 */
const RegisterForm: React.FC = () => {
  // Estado para los datos del formulario
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

  // Estado para los errores de validación
  const [errores, setErrores] = useState<Errores>({});
  // Estado para mostrar/ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);
  // Estado para mostrar/ocultar la confirmación de contraseña
  const [showConfirm, setShowConfirm] = useState(false);

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - Evento de cambio del input o select.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Maneja el envío del formulario, valida los campos y guarda el usuario si es válido.
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío del formulario.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Errores = {};

    // Validaciones de los campos
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

    // Si no hay errores, guarda el usuario y muestra alerta de registro exitoso
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

  /**
   * Limpia el formulario y los errores.
   */
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

  return (
    <div className="registro-bg">
      <div className="registro-logo">
        <img src="/logoPlenaStudio.png" alt="Plena Studio" />
      </div>
      <h2 className="registro-titulo">Crea tu cuenta</h2>
      <form className="registro-form" onSubmit={handleSubmit} autoComplete="off">
        <fieldset className="registro-fieldset">
          <legend className="registro-legend">Tus datos</legend>
          <div className="registro-grid">
            {/* Campos de datos personales */}
            <div className="registro-col">
              <label>Nombres</label>
              <input className={errores.nombres ? 'error' : ''} placeholder="Ingresa tu nombre aquí" name="nombres" value={formData.nombres} onChange={handleChange} />
            </div>
            <div className="registro-col">
              <label>Apellidos</label>
              <input className={errores.apellidos ? 'error' : ''} placeholder="Ingresa tus apellidos aquí" name="apellidos" value={formData.apellidos} onChange={handleChange} />
            </div>
            <div className="registro-col">
              <label>Correo</label>
              <input className={errores.correo ? 'error' : ''} placeholder="ejemplo@email.com" name="correo" value={formData.correo} onChange={handleChange} />
            </div>
            <div className="registro-col">
              <label>Dirección de residencia</label>
              <input className={errores.direccion ? 'error' : ''} placeholder="Carrera, número, bloque, casa..." name="direccion" value={formData.direccion} onChange={handleChange} />
            </div>
            <div className="registro-col">
              <label>Teléfono celular</label>
              <input className={errores.celular ? 'error' : ''} placeholder="Número de teléfono celular" name="celular" value={formData.celular} onChange={handleChange} />
            </div>
            <div className="registro-col">
              <label>Tipo de identificación</label>
              <select className={errores.tipoIdentificacion ? 'error' : ''} name="tipoIdentificacion" value={formData.tipoIdentificacion} onChange={handleChange}>
                <option value="">Selecciona el tipo de identificación</option>
                <option value="CC">Cédula de ciudadanía</option>
                <option value="CE">Cédula de extranjería</option>
                <option value="TI">Tarjeta de identidad</option>
              </select>
            </div>
            <div className="registro-col">
              <label>Número de identificación</label>
              <input className={errores.numeroIdentificacion ? 'error' : ''} placeholder="Ingrese número de ID" name="numeroIdentificacion" value={formData.numeroIdentificacion} onChange={handleChange} />
            </div>
            {/* Contraseña */}
            <div className="registro-col">
              <label>Contraseña</label>
              <div className="registro-password">
                <input
                  className={`form-control ${errores.contraseña ? 'error' : ''}`}
                  placeholder="Por favor digita tu contraseña"
                  type={showPassword ? "text" : "password"}
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  style={{ background: "#F4D7D7", borderRadius: 20, paddingRight: 36 }}
                />
                {/* Icono para mostrar/ocultar contraseña */}
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
              <label>Confirma tu contraseña</label>
              <div className="registro-password">
                <input
                  className={`form-control ${errores.confirmar ? 'error' : ''}`}
                  placeholder="Por favor digita tu contraseña"
                  type={showConfirm ? "text" : "password"}
                  name="confirmar"
                  value={formData.confirmar}
                  onChange={handleChange}
                  style={{ background: "#F4D7D7", borderRadius: 20, paddingRight: 36 }}
                />
                {/* Icono para mostrar/ocultar confirmación */}
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
        {/* Botones de acción */}
        <div className="registro-botones">
          <button
            type="button"
            className="cancelar"
            onClick={limpiarFormulario}
            style={{ background: "#8ABF69", borderRadius: 20, width: 136, height: 31 }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="registrar"
            style={{ background: "#8ABF69", borderRadius: 20, width: 136, height: 31 }}
          >
            Regístrate
          </button>
        </div>
        {/* Enlace para usuarios ya registrados */}
        <div className="registro-login" style={{ textAlign: "center", marginTop: 8 }}>
          <div>¿Ya estás registrado?</div>
          <a href="/login" style={{ display: "block", marginTop: 4 }}>Iniciar sesión</a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;