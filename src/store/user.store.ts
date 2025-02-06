import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { authService } from '../services/auth.services';
import { AuthState } from '../interfaces/store.interfaces';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
          return user;
        } catch (err: any) {
          set({ error: err.message });
          return null;
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          await authService.logout();
          set({ user: null });
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
    }),

    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);
