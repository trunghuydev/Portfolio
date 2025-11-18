import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/api/publicApi';
import { QueryKeys } from '@/Constants/query-key';
import { Skill } from '@/Interface/TSkills';

export const usePublicSkills = (username: string) => {
  return useQuery<Skill[]>({
    queryKey: [QueryKeys.PUBLIC_SKILLS, username],
    queryFn: () => publicApi.getPublicSkills(username),
    enabled: !!username,
  });
};

