import Cookies from 'js-cookie';
import { create } from 'zustand';
import { axios } from '../lib/axios';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
interface AuthActions {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
interface User {
  username: string;
}
const cookieKey = 'authData';
const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  loading: false,
  error: null,
  login: async (username: string, password: string) => {
    set((state) => ({ ...state, loading: true, error: null }));
    try {
      await axios.post('/auth/login', {
        username,
        password,
      });

      const authData: AuthState = {
        user: { username },
        loading: false,
        error: null,
      };

      set(authData);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const firstError = error.response.data.errors[0];
        const errorMessage = firstError.message || 'An error occurred';
        set((state) => ({ ...state, error: errorMessage, loading: false }));
      } else {
        set((state) => ({ ...state, error: 'An error occurred', loading: false }));
      }
    }
  },
  logout: () => {
    Cookies.remove(cookieKey);
    set({ user: null, loading: false, error: null });
  },
}));

export default useAuthStore;
