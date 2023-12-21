import { create } from 'zustand';
import { axios } from '../lib/axios';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

interface AuthState {
  user: User | null;
  token: string | null;
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
const useAuthStore = create<AuthState & AuthActions>((set) => {
  const loadAuthData = () => {
    try {
      const storedAuthData = Cookies.get(cookieKey);
      const parsedAuthData = storedAuthData ? JSON.parse(storedAuthData) : null;
      return parsedAuthData || { user: null, token: null, loading: false, error: null };
    } catch (error) {
      console.error('Error parsing auth data:', error);
      return { user: null, token: null, loading: false, error: 'Error loading auth data' };
    }
  };
  const initialAuthData: AuthState = loadAuthData();
  set(initialAuthData);
  return {
    user: initialAuthData.user,
    token: initialAuthData.token,
    loading: false,
    error: null,
    login: async (username: string, password: string) => {
      set((state) => ({ ...state, loading: true, error: null }));
      try {
        const response: AxiosResponse<{ token: string; data: User }> = await axios.post(
          '/auth/login',
          {
            username,
            password,
          },
        );

        const authData: AuthState = {
          user: { username },
          token: response.data.token,
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
      set({ user: null, token: null, loading: false, error: null });
    },
  };
});

export default useAuthStore;
