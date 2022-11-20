import { Navigate } from 'react-router-dom';
import { useAuthValue } from './AuthContext';

export default function RequireAuth({ children, redirectTo}) {
  const { currentUser } = useAuthValue();

  return currentUser?.emailVerified ? children : <Navigate to={redirectTo} />;
}