// src/Hook/usegetInform.ts
import { useQuery } from '@tanstack/react-query';
import { PersonalInfo } from '@/Interface/TInformation';
import { docApi } from '@/api/docApi';

import { QueryKeys } from '@/Constants/query-key';
import { createAxiosClient } from '@/api/axiosClient';

export const useProfile = (accessToken: string) => {
  const api = docApi(createAxiosClient(accessToken));

  return useQuery<PersonalInfo>({
    queryKey: [QueryKeys.PROFILE, accessToken],
    queryFn: () => api.getProfile(),
    enabled: !!accessToken,
  });
};
