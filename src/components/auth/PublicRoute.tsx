import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/user.store';
import { useEffect, useState } from 'react';
import { Spinner } from '../common/Spinner';

export const PublicRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const checkUserSession = useAuthStore((state) => state.checkUserSession);

  useEffect(() => {
    const checkSession = async () => {
      await checkUserSession();
      const currentUser = useAuthStore.getState().user;

      if (currentUser) {
        setAuthenticated(true);
      }

      setLoading(false);
    };
    
    checkSession();
  }, [checkUserSession]);
  
  console.log(loading)
  if (loading) return <Spinner />;

  if (authenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};
