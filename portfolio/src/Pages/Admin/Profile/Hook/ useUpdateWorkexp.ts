import { useMutation } from '@tanstack/react-query';
import { docApi } from '@/api/docApi';
import { createAxiosClient } from '@/api/axiosClient';
import { WorkExperiencePayload } from '@/Interface/TWorkExp';

export const useUpdateWorkexp = (accessToken: string) => {
  const api = docApi(createAxiosClient(accessToken));
  
  return useMutation({
    mutationFn: ({ we_id, payload }: { we_id: string; payload: WorkExperiencePayload }) => 
      api.updateWorkExperience(we_id, payload),
  });
};
