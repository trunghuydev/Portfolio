import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Login, LoginResponse } from '@/Interface/auth';
import { useAuthStore } from '@/Store/auth';
import { docApi } from '@/api/docApi';

export const useLogin = (): UseMutationResult<LoginResponse, Error, Login> => {
  const setTokens = useAuthStore((state) => state.setTokens);
  const setuserId = useAuthStore((state) => state.setuserId);

  return useMutation<LoginResponse, Error, Login>({
    mutationFn: (credentials: Login) => docApi.Login(credentials),

    onSuccess: (data) => {
      const { token, user_name, user_id } = data;
      const { accessToken, refreshToken } = token;

      if (accessToken && refreshToken && user_name) {
        console.log('Đăng nhập thành công:', user_name);
        setTokens(accessToken, refreshToken, user_name);
        setuserId(user_id); 
      } else {
        console.warn('Thiếu thông tin đăng nhập từ server.');
      }
    },

    onError: (error) => {
      console.error('Đăng nhập thất bại:', error.message);
    },
  });
};
