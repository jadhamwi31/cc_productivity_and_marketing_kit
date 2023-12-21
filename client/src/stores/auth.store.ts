import create from 'zustand';
import { axios } from '../lib/axios';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
interface AuthState {
  username: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

interface AuthActions {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  username: Cookies.get('username') || null,
  token: null,
  loading: false,
  error: null,
  message: null,
  login: async (username: string, password: string) => {
    set((state) => ({ ...state, loading: true, error: null, message: null }));
    try {
      const response = await axios.post<{}, AxiosResponse<any>>('/auth/login', {
        username,
        password,
      });
      Cookies.set('username', username);
      const data = response.data;
      set((state) => ({ ...state, user: data, loading: false, message: 'Login successful' }));
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = error.response.data.errors[0]?.message || 'An error occurred';
        set((state) => ({ ...state, error: errorMessage, loading: false, message: null }));
      } else {
        set((state) => ({
          ...state,
          error: error.message || 'An error occurred',
          loading: false,
          message: null,
        }));
      }
    }
  },
  logout: () => {
    Cookies.remove('username');
    set({ username: null, token: null, loading: false, error: null, message: null });
  },
}));

export default useAuthStore;
