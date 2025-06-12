import { ADMIN_ACCOUNT } from '@/Constants/account';
import { Role } from '@/Types/roles';
import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  username: string;
  role: Role;
};

type AuthContextType = {
  user: User;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const defaultUser: User = {
  username: 'guest',
  role: Role.VIEWER,
};

const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  const login = (username: string, password: string) => {
    if (username === ADMIN_ACCOUNT.username && password === ADMIN_ACCOUNT.password) {
      setUser({ username, role: Role.ADMIN });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(defaultUser);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
