
import { useEffect } from 'react';
import { useLogin } from './useLogin';

const AUTO_LOGIN_INTERVAL_MS = 1* 60 * 1000;

export const useAutoLogin = (username: string, password: string) => {
  const loginMutation = useLogin();

  useEffect(() => {
    const login = () => {
      loginMutation.mutate({ username, password });
    };

    login(); 

    const interval = setInterval(login, AUTO_LOGIN_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [username, password]); 
};
