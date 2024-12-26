import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '../common/Spinner';
import { useState, useEffect } from 'react';

export const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    const userSession = localStorage.getItem('user');

    if (userSession) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    setLoading(false);
  }, []);

  if (loading) return <Spinner />;

  if (!authenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

