import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '../common/Spinner';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/user.store';

export const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const checkUserSession = useAuthStore((state) => state.checkUserSession);
  
  useEffect(() => {
    const checkSession = async () => {
      await checkUserSession();
    };
    checkSession();
  }, [checkUserSession]);

  if (loading) return <Spinner />;

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
