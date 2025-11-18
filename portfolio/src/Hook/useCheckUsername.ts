import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/api/publicApi';
import { QueryKeys } from '@/Constants/query-key';

export const useCheckUsername = (username: string, enabled: boolean = true) => {
  return useQuery<{ available: boolean; message: string }>({
    queryKey: [QueryKeys.CHECK_USERNAME, username],
    queryFn: () => publicApi.checkUsername(username),
    enabled: enabled && !!username && username.length >= 3,
    retry: false,
  });
};

