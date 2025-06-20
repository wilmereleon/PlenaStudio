import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './Login.module.css';

/**
 * LoginForm
 * 
 * Componente de formulario de inicio de sesión para Plena Studio.
 * Permite a los usuarios ingresar su correo y contraseña para autenticarse.
 * 
 * @component
 * 
 * @returns {JSX.Element} El formulario de inicio de sesión.
 * 
 * @state
 * @property {Object} formData - Estado que almacena los valores de los campos del formulario.
 * @property {string} formData.email - Correo electrónico ingresado por el usuario.
 * @property {string} formData.password - Contraseña ingresada por el usuario.
 * @property {string} error - Mensaje de error a mostrar si ocurre algún problema en el login.
 * @property {boolean} isSubmitting - Indica si el formulario está en proceso de envío.
 * @property {boolean} showPassword - Indica si la contraseña debe mostrarse en texto plano.
 * 
 * @function handleChange
 * Actualiza el estado formData cuando el usuario escribe en los campos del formulario.
 * 
 * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio del input.
 * 
 * @function handleSubmit
 * Maneja el envío del formulario, valida los campos y llama a la función de login.
 * 
 * @param {React.FormEvent} e - Evento de envío del formulario.
 */
const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * Actualiza el estado del formulario cuando el usuario escribe en los campos.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio del input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  /**
   * Maneja el envío del formulario, valida los campos y realiza el login.
   * @param {React.FormEvent} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <img src="/logoPlenaStudio.png" alt="Plena Studio" style={{ maxWidth: 220, marginBottom: 10 }} />
          <h2 className={styles.title}>Iniciar sesión</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Correo</label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="Ingresa tu correo"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              style={{ background: "#F4D7D7" }}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Contraseña</label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{ background: "#F4D7D7", width: "100%" }}
                required
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                style={{ userSelect: "none" }}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </span>
            </div>
          </div>
          {error && (
            <div className={styles.errorMessage}>
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}
          <div className={styles.submitRow}>
            <span style={{ fontSize: 12, color: "#232c2b" }}>
              <Link to="/forgot-password" className={styles.link}>
                ¿Has olvidado tu contraseña?
              </Link>
            </span>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              Iniciar sesión
            </button>
          </div>
        </form>
        <div className={styles.footer}>
          <div className={styles.footerText}>¿Aún no tienes una cuenta?</div>
          <Link to="/register" className={styles.link}>
            Crear una cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;