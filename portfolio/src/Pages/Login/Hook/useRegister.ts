import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { DevRegisterPayload, DevRegisterResponse } from '@/Interface/auth';
import { useAuthStore } from '@/Store/auth';
import { docApi } from '@/api/docApi';
import { createAxiosClient } from '@/api/axiosClient';
import { message } from 'antd';

export const useRegister = (): UseMutationResult<DevRegisterResponse, Error, DevRegisterPayload> => {
  const setTokens = useAuthStore((state) => state.setTokens);
  const setuserId = useAuthStore((state) => state.setuserId);

  return useMutation<DevRegisterResponse, Error, DevRegisterPayload>({
    mutationFn: async (payload: DevRegisterPayload) => {
      const api = docApi(createAxiosClient(''));
      return api.devRegister(payload);
    },

    onSuccess: (data) => {
      const { token, user_name, user_id, email } = data;
      const { accessToken, refreshToken } = token;

      if (accessToken && refreshToken && user_name) {
        setTokens(accessToken, refreshToken, user_name, email || null);
        setuserId(user_id);
        message.success('Đăng ký thành công!');
        // Don't auto-navigate, let user choose what to do
      } else {
        message.error('Đăng ký thành công nhưng đăng nhập thất bại. Vui lòng đăng nhập thủ công.');
      }
    },

    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'Đăng ký thất bại!';
      message.error(errorMessage);
    },
  });
};

