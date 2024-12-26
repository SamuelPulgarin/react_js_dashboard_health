import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/user.store';
import toast from 'react-hot-toast';

export const useAuth = () => {

  const navigate = useNavigate();

  const email = useAuthStore((state) => state.email);
  const password = useAuthStore((state) => state.password);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setPassword = useAuthStore((state) => state.setPassword);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const user = useAuthStore((state) => state.user);
  const checkUserSession = useAuthStore((state) => state.checkUserSession);

  const checkSession = useCallback(() => {
    checkUserSession();
  }, [checkUserSession]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const handleSubmit = async () => {

    try {
      await login(email, password);

      const currentUser = useAuthStore.getState().user;

      if(currentUser) {
        toast.success('¡Logged in successfully!');
        navigate('/dashboard');
      } else if(error){
        toast.error(error);
      }
    } catch (err) {
      toast.error('Failed to login');
    }

    if (user) {
      toast.success(`¡Success log in!`);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success(`successful logout`);
    navigate('/');
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
    handleLogout,
    loading,
    error,
  };
};
