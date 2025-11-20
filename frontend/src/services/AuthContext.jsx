import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../lib/api";

const AuthCtx = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() { return useContext(AuthCtx); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    authApi.me().then(d => setUser(d.user)).catch(() => {}).finally(()=>setReady(true));
  }, []);

  const login = async (email, password) => {
    const d = await authApi.login({ email, password });
    setUser(d.user);
  };
  const register = async (name, email, password) => {
    const d = await authApi.register({ name, email, password });
    setUser(d.user);
  };
  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, ready, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
