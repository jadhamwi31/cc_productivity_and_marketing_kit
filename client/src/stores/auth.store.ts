import Cookies from 'js-cookie';
import { create } from 'zustand';
import { axios } from '../lib/axios';

interface AuthState {
  user: String | null;
  loading: boolean;
  error: string | null;
}
interface AuthActions {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const cookieKey = 'authData';
const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: Cookies.get(cookieKey) || null,
  loading: false,
  error: null,
  login: async (username: string, password: string) => {
    set((state) => ({ ...state, loading: true, error: null }));
    try {
      const response = await axios.post('/auth/login', {
        username,
        password,
      });

      const authData: AuthState = {
        user: response.data.username,
        loading: false,
        error: null,
      };
      Cookies.set(cookieKey, JSON.stringify(authData));
      
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
