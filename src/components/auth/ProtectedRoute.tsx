import { Navigate  } from 'react-router-dom';
import { Spinner } from '../common/Spinner';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/user.store';

export const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const checkUserSession = useAuthStore((state) => state.checkUserSession);
  
  useEffect(() => {
    const checkSession = async () => {
      await checkUserSession();
      const currentUser = useAuthStore.getState().user;
      // const userSession = localStorage.getItem('user');

      if (currentUser) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };
    checkSession();
  }, []);

  if (useAuthStore.getState().loading) return <Spinner />;

  if (!authenticated) {
    return <Navigate to="/" />;
  }

  return <Navigate to="/dashboard" />;
};

