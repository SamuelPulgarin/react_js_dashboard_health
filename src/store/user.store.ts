import { create } from 'zustand';
import { authService } from '../services/auth.services';
import { AuthState } from '../interfaces/store.interfaces';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: '',
  email: '',
  password: '',
  loggedInUser: null,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  login: async (email: string, password: string) => {
    set({ loading: true, error: '' });
    try {
      const user = await authService.login(email, password);
      set({ user });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await authService.logout();
      set({ user: null });
      localStorage.removeItem('user');
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  checkUserSession: async () => {
    set({ loading: true });
    try {
      const user = await authService.getUser();
      set({ user });
    } catch (err) {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
}));
