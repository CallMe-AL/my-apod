import { Navigate } from 'react-router-dom';
import { useAuthValue } from './AuthContext';

export default function RequireAuth({ children, redirectTo}) {
  const { isLoggedIn } = useAuthValue();

  return !isLoggedIn ? children : <Navigate to={redirectTo} />;
}