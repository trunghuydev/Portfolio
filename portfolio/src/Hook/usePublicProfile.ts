import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/api/publicApi';
import { QueryKeys } from '@/Constants/query-key';
import { PersonalInfo } from '@/Interface/TPersonalInfo';

export const usePublicProfile = (username: string) => {
  return useQuery<PersonalInfo>({
    queryKey: [QueryKeys.PUBLIC_PROFILE, username],
    queryFn: () => publicApi.getPublicProfile(username),
    enabled: !!username,
  });
};

