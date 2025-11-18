import { useMutation } from '@tanstack/react-query';
import { RefreshTokenPayload, RefreshTokenResponse } from '@/Interface/auth';
import { docApi } from '@/api/docApi';
import { createAxiosClient } from '@/api/axiosClient';
import { useAuthStore } from '@/Store/auth';

export const useRefreshToken = () => {
  const setTokens = useAuthStore((state) => state.setTokens);
  const userName = useAuthStore((state) => state.userName);
  const email = useAuthStore((state) => state.email);

  return useMutation<RefreshTokenResponse, Error, RefreshTokenPayload>({
    mutationFn: async (body: RefreshTokenPayload) => {
      const api = docApi(createAxiosClient(''));
      return api.refreshToken(body);
    },
    onSuccess: (data) => {
      const { accessToken, refreshToken: newRefreshToken } = data;
      if (accessToken && newRefreshToken && userName) {
        setTokens(accessToken, newRefreshToken, userName, email);
      }
    },
  });
};

