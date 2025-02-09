import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/user.store';

export const PublicRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};
