import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

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
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, var(--color-whitesmoke) 0%, var(--color-honeydew) 100%)',
        fontFamily: 'var(--font-lato)'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div 
              className="card shadow-lg border-0"
              style={{
                borderRadius: 'var(--br-20)',
                border: '1px solid var(--color-mistyrose)'
              }}
            >
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <h1 
                    className="card-title mb-2"
                    style={{
                      fontFamily: 'var(--font-garamond)',
                      fontSize: 'var(--font-size-32)',
                      fontWeight: 700,
                      color: 'var(--color-slategray)'
                    }}
                  >
                    Iniciar Sesión
                  </h1>
                  <p 
                    className="text-muted"
                    style={{
                      fontSize: 'var(--font-size-16)',
                      color: 'var(--color-darkslategray-100)'
                    }}
                  >
                    Accede a tu cuenta de PlenaStudio
                  </p>
                </div>

                {/* Credenciales de prueba */}
                <div 
                  className="alert alert-info mb-4"
                  style={{
                    backgroundColor: 'var(--color-honeydew)',
                    borderColor: 'var(--color-lightgreen)',
                    color: 'var(--color-darkslategray-200)'
                  }}
                >
                  <h6 className="alert-heading mb-2">
                    <i className="bi bi-info-circle me-2"></i>
                    Credenciales de prueba:
                  </h6>
                  <small className="d-block">
                    <strong>Admin:</strong> admin@plenastudio.co / admin123
                  </small>
                  <small className="d-block">
                    <strong>Usuario:</strong> usuario@demo.com / demo123
                  </small>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      {error}
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      <i className="bi bi-envelope me-2"></i>
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu-email@ejemplo.com"
                      disabled={isSubmitting}
                      required
                      style={{
                        borderColor: 'var(--color-whitesmoke)',
                        borderWidth: '2px'
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">
                      <i className="bi bi-lock me-2"></i>
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      disabled={isSubmitting}
                      required
                      style={{
                        borderColor: 'var(--color-whitesmoke)',
                        borderWidth: '2px'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-lg w-100 mb-3"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: 'var(--color-slategray)',
                      borderColor: 'var(--color-slategray)',
                      color: 'white',
                      fontWeight: 600,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-darkslategray-100)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-slategray)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Iniciar Sesión
                      </>
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="text-center">
                  <p className="text-muted mb-0">
                    ¿No tienes cuenta?{' '}
                    <Link 
                      to="/register" 
                      className="text-decoration-none"
                      style={{
                        color: 'var(--color-lightgreen)',
                        fontWeight: 600
                      }}
                    >
                      Regístrate aquí
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;