import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Login, LoginResponse } from '@/Interface/auth';
import { useAuthStore } from '@/Store/auth';
import { docApi } from '@/api/docApi';
import { createAxiosClient } from '@/api/axiosClient';


export const useLogin = (): UseMutationResult<LoginResponse, Error, Login> => {
  const setTokens = useAuthStore((state) => state.setTokens);
  const setuserId = useAuthStore((state) => state.setuserId);

  return useMutation<LoginResponse, Error, Login>({
    mutationFn: async (credentials: Login) => {
     
      const api = docApi(createAxiosClient(''));
      return api.Login(credentials);
    },

    onSuccess: (data) => {
      const { token, user_name, user_id,email } = data;
      const { accessToken, refreshToken } = token;

      if (accessToken && refreshToken && user_name) {
        // console.log('Đăng nhập thành công:', user_name);
        setTokens(accessToken, refreshToken, user_name,email);
        setuserId(user_id);
      } else {
        // console.warn('Thiếu thông tin đăng nhập từ server.');
      }
    },

   
  });
};
