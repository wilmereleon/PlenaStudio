// pages/ActivarCuenta.tsx
import { useSearchParams } from 'react-router-dom';
import { activateUser } from '../utils/userStorage';

const ActivarCuenta = () => {
  const [params] = useSearchParams();
  const token = params.get('token');

  useEffect(() => {
    if (token) {
      activateUser(token);
      alert("Cuenta activada correctamente");
    }
  }, [token]);

  return <p>Cuenta activada. Ya puedes iniciar sesión.</p>;
};
