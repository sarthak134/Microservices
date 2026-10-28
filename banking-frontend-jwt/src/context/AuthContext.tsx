import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, type RegisterPayload } from '../services/api';

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<string>;
  logout: () => void;
};
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function normalizeToken(response: string): string {
  // Spring may serialize a String as JSON text depending on response configuration.
  const token = response.trim().replace(/^"|"$/g, '');
  if (!token || token.startsWith('{') || token.startsWith('[')) {
    throw new Error('The authentication service did not return a JWT string. Check POST /auth/token response.');
  }
  return token;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(sessionStorage.getItem('northstar-token')));
  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated,
    login: async (username, password) => {
      const response = await authApi.login({ username: username.trim(), password });
      const token = normalizeToken(response);
      sessionStorage.setItem('northstar-token', token);
      sessionStorage.setItem('northstar-auth', 'true');
      sessionStorage.setItem('northstar-username', username.trim());
      setIsAuthenticated(true);
    },
    register: async (payload) => authApi.register(payload),
    logout: () => {
      sessionStorage.removeItem('northstar-token');
      sessionStorage.removeItem('northstar-auth');
      sessionStorage.removeItem('northstar-username');
      setIsAuthenticated(false);
    },
  }), [isAuthenticated]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
export function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return () => { logout(); navigate('/login', { replace: true }); };
}
